// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const waitTxt = document.querySelector(".result_box .wait_text");
const camOpen = document.querySelector(".camera video"); // Adjust if needed
let mediaStream; // To hold the media stream

// Start camera when the quiz starts
async function startCamera() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        camOpen.srcObject = mediaStream; // Set the video element's source to the stream
        camOpen.play();
    } catch (err) {
        console.error("Camera access denied or not available:", err);
    }
}

// If startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Show info box
    startCamera(); // Start the camera
};

// If exit quiz button clicked
exit_btn.onclick = () => {
    stopCamera(); // Stop the camera stream if exiting
    location.replace("./quiz.html"); // Redirect to quiz.html or logout
};

// If continue quiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.add("activeQuiz"); // Show quiz
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
};

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    // Creating a new span and div tag for questions and option and passing the value using array
    let que_tag = 
        "<span>" +
        questions[index].numb + ". " + 
        questions[index].question +
        "</span>";

    let option_tag = 
        '<div class="option"><span>' +
        questions[index].options[0] + 
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[1] + 
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[2] + 
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[3] + 
        "</span></div>";

    que_text.innerHTML = que_tag; // Adding new span tag inside que_tag
    option_list.innerHTML = option_tag; // Adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // Set on-click attribute to all available options
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let counter;
let counterLine;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let timeValue = 15;
let widthValue = 0;

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    let userAns = answer.textContent; // Getting user selected option
    let correcAns = questions[que_count].answer; // Getting correct answer
    const allOptions = option_list.children.length; // Getting all options items

    if (userAns == correcAns) {
        userScore += 1; // Incrementing the user's score
        console.log("Correct Answer");
        console.log("Your correct answer = " + userScore);
    } else {
        console.log("Wrong Answer");
    }
    
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // Once user selects an option, disable all options
    }
    next_btn.classList.add("show"); // Show the next button if user selected any option
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// If next question button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        // If question count is less than total questions
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = 'Time Left';
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
};

function queCounter(index) {
    // Creating a new span tag and passing the question number and total questions
    let totalQueCounTag = 
        "<span><p>" +
        index +
        "</p> of <p>" +
        questions.length +
        "</p> Questions</span>";
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; // Changing the value of timeCount with time value
        time--; // Decrement the time value

        if (time < 9) {
            // If timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // Add a 0 before the time value
        }

        if (time < 0) {
            // If timer is less than 0
            clearInterval(counter);
            timeText.textContent = "Time Off"; // Change the time text to "Time Off"
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

// Function to stop the camera
function stopCamera() {
    if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop()); // Stop all video tracks
        mediaStream = null; // Clear the mediaStream variable
    }
}

// Show results after the quiz
function showResult() {
    stopCamera(); // Stop the camera when showing results
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.remove("activeQuiz"); // Hide quiz box
    result_box.classList.add("activeResult"); // Show result box
    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 3) {
        let scoreTag =  
            "<span>Congrats! You got <p>" + userScore +
            "</p> out of <p>" + questions.length +
            "</p></span>";
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = 
            "<span>Nice, You got <p>" + userScore +
            "</p> out of <p>" + questions.length +
            "</p></span>";
        scoreText.innerHTML = scoreTag;
    }
    
    // Wait for 10 seconds and then redirect
    setTimeout(function() {
        window.location.href = 'http://127.0.0.1:5000';
    }, 10000);
}

// Disable screenshot (if needed)
window.addEventListener('screenshotTaken', function(e) {
    e.preventDefault();
});

// Disable screen recording (if needed)
window.addEventListener('beforeunload', function(e) {
    // Media recorder logic can be implemented here if necessary
});
