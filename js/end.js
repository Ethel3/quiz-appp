const username = document.querySelector('#username')
const saveScore= document.querySelector('#saveScore')
const finalScore= document.querySelector('#finalScore')
const mostRecentScore = document.querySelector('#mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener("keyup", [] => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()


const score = {
    score: mostRecentScore,
    name: username.value

}

highScores.push(score)
}