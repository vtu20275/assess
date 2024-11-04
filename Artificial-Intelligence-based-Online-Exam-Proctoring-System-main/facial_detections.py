import dlib
import cv2
from imutils import face_utils

# Initialize the face detector and shape predictor once
faceDetector = dlib.get_frontal_face_detector()
shapePredictor = dlib.shape_predictor(r'C:/Users/dasar/Downloads/Artificial-Intelligence-based-Online-Exam-Proctoring-System-main/Artificial-Intelligence-based-Online-Exam-Proctoring-System-main/shape_predictor_model/shape_predictor_68_face_landmarks.dat')

def detectFace(frame):
    """
    Detects faces in a given frame without drawing landmarks.
    
    Args:
        frame (numpy.ndarray): A frame from a video or camera feed.
    
    Returns:
        tuple: A tuple containing the count of faces detected and a list of detected face rectangles.
    """
    # Convert to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the grayscale image
    faces = faceDetector(gray, 0)
    faceCount = len(faces)

    for face in faces:
        # Get face coordinates
        x, y, w, h = face.left(), face.top(), face.width(), face.height()

        

    return faceCount, faces
