//
let questionInd = 0;
let time = questions.length * 15;
let timerID;


// 
let initialElement = document.getElementById("initials");
let quesElement = document.getElementById("questions");
let timerElement = document.getElementById("time");
let choicesElement = document.getElementById("choices");
let startBtn = document.getElementById("start");
let submitBtn = document.getElementById("submit");
let feedBack = document.getElementById("feedback");

let sfxR = new Audio("assets/sfx/correct.wav");

function clickQuestion() {
    if (this.value !== questions[questionInd].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }
        timerElement.textContent = time;
        feedBack.textContent = "Wrong"
    } else {
        sfxR.play;
        feedBack.textContent = "Correct!";
    }

    feedBack.setAttribute("class", "feedback");

    setTimeout(function() {
        feedBack.setAttribute("class", "feedback hide")
    }, 1000);

    questionInd++;

    if (questionInd === questions.length) {
        endQuiz()        
    } else {
        getQuizQuestion();
    }


}

function getQuizQuestion(){
    let currentQuestion = questions[questionInd];

    let titleElement = document.getElementById("question-title");

    titleElement.textContent = currentQuestion.title;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, index) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = `${index + 1}.${choice}`
        choiceBtn.addEventListener("click", clickQuestion);
        choicesElement.append(choiceBtn);
    })

}



function startQuiz() {
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class","hide");

    quesElement.removeAttribute("class");

    timerID = setInterval(clockTick, 1000)
    timerElement.textContent = time;
    getQuizQuestion();
}

function endQuiz() {
    clearInterval(timerID);

    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");

    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;
    quesElement.setAttribute("class","hide");

}

function clockTick () {
    time--;
    timerElement.textContent = time;

    if(time <= 0){
       endQuiz(); 
    }

}

function saveScore() {
    let initials = initialElement.value.trim();
    console.log(initials);

    if (initials !== ""){
        let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            initials: initials
        }
        highScores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highScores));
        window.location.href = "highscores.html";
    }

}

function checkEnter(event) {
    if(event.key === "Enter") {
        saveScore();
    }

}

startBtn.addEventListener("click", startQuiz);

submitBtn.addEventListener("click", saveScore);

initialElement.addEventListener("keyup", checkEnter);