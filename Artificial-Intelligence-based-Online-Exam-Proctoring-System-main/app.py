import cv2
import time
from flask import Flask, Response, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from facial_detections import detectFace
from blink_detection import isBlinking
from mouth_tracking import mouthTrack
from object_detection import detectObject
from eye_tracker import gazeDetection
from head_pose_estimation import head_pose_detection 
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'index'

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

data_record = []
cam = cv2.VideoCapture(0)

if not cam.isOpened():
    raise Exception("Could not open video device")

def faceCount_detection(faceCount):
    if faceCount > 1:
        return "Multiple faces detected."
    elif faceCount == 0:
        return "No face detected."
    else:
        return "Face detected properly."

def generate_frames():
    blinkCount = 0
    while True:
        ret, frame = cam.read()
        if not ret:
            break

        record = []
        current_time = datetime.now().strftime("%H:%M:%S.%f")
        record.append(current_time)

        faceCount, faces = detectFace(frame)
        remark = faceCount_detection(faceCount)
        record.append(remark)

        if faceCount == 1:
            blinkStatus = isBlinking(faces, frame)
            if blinkStatus[2] == "Blink":
                blinkCount += 1
                record.append(blinkStatus[2] + " count: " + str(blinkCount))
            else:
                record.append(blinkStatus[2])

            eyeStatus = gazeDetection(faces, frame)
            record.append(eyeStatus)

            mouthStatus = mouthTrack(faces, frame)
            record.append(mouthStatus)

            objectName = detectObject(frame)
            record.append(objectName)

            headPose = head_pose_detection(faces, frame)
            record.append(headPose)
        else:
            data_record.append(record)
            continue

        data_record.append(record)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        action = request.form.get('action')
        username = request.form['username']
        password = request.form['password']

        if action == 'login':
            user = User.query.filter_by(username=username).first()
            if user and check_password_hash(user.password, password):
                login_user(user)
                return redirect(url_for('video_feed'))
            flash('Login Unsuccessful. Please check username and password', 'danger')

        elif action == 'register':
            hashed_password = generate_password_hash(password, method='sha256')
            new_user = User(username=username, password=hashed_password)

            with app.app_context():
                db.session.add(new_user)
                db.session.commit()

            flash('Registration successful! You can now log in.', 'success')

    return render_template('index.html')

@app.route('/video_feed')
@login_required
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the database tables
    app.run(host='0.0.0.0', port=5001, debug=True)

    # Save activity data to a file after the server stops
    with open('activity.txt', 'w') as file:
        activityVal = "\n".join(map(str, data_record))
        file.write(str(activityVal))
