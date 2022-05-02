const highScoresList = document.querySelector('#highscoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.InnerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name}</li>`
})