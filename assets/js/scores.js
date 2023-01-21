function displayHighScores(){
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    })

    highscores.forEach(function(score) {
        let li = document.createElement("li");
        li.textContent = `${scores.initials} - ${scores.score}`

        let ol = document.getElementById("score");
        ol.appendChild(li);
    })

}

function clearScores(){
    localStorage.removeItem("score");
    window.location.reload();

}

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearScores);

// document.getElementById("clear").onclick = clearScores;

displayHighScores();