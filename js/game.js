const question = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
// console.log(progressBarFull);

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = {}


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
        
    }

    questionCounter++
    progressText.InnerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question


    for (let i = 0; i < choices.length; i++) {
        const choice = choices[i]
        const number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice' + number]
        
    }
    
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}
// console.log(choices[0]);
for (let i = 0; i < choices.length; i++) {
    const element = choices[i];
    element.addEventListener ('click', e=>{
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
 
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect'
 
 
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
 
        selectedChoice.parentElement.classList.add(classToApply)
 
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
 
        },1000)
    })
}

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()