function displayHighScores(){
    let highScores = JSON.parse(localStorage.getItem("highscores")) || [];

    highScores.sort(function(a, b) {
        return b.score - a.score;
    })
// to display the player name & scores in order list
    highScores.forEach(function(score) {
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`

        let ol = document.getElementById("highscores");
        ol.appendChild(li);
    })

}

// create the function to clear the score.
function clearScores(){
    localStorage.removeItem("highscores");
    window.location.reload();
}

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearScores);

displayHighScores();