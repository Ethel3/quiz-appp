const question = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const game = document.getElementById("game");
const preloader = document.getElementById("preloader");
// console.log(progressBarFull);

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = {}

const SOUNDCORRECT = new Audio("../sounds/sound_correct.mp3");
const SOUNDINCORRECT = new Audio("../sounds/sound_incorrect.mp3");

const SCORE_POINTS = 50
const MAX_QUESTIONS = 20
let ANSWERINDEX = 0


const fetchQuestions = async (num) => {
    url = `https://opentdb.com/api.php?amount=${num}&category=9&difficulty=hard&type=multiple`
    let response = await fetch(url);
    let data = await response.json()

    // show game
    game.classList.remove('hidden')
    preloader.classList.add('hidden')
    return data.results

}
startGame = async() => {
    let questions = await fetchQuestions(500)
    // return
    questionCounter = 0
    score = 0
    availableQuestions = [... questions]
    
    // console.log(availableQuestions);
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
    // console.log(currentQuestion);
    question.innerHTML = currentQuestion.question

    ANSWERINDEX = Math.floor(Math.random() * currentQuestion.incorrect_answers.length)
    // console.log(currentQuestion.correct_answer, ANSWERINDEX);
    currentQuestion.incorrect_answers.splice(ANSWERINDEX, 0, currentQuestion.correct_answer)
    // console.log(currentQuestion.incorrect_answers);
    for (let i = 0; i < currentQuestion.incorrect_answers.length; i++) {
        choices[i].dataset['number'] = i;
        choices[i].innerHTML =currentQuestion.incorrect_answers[i]
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
        // console.log(selectedChoice.target.dataset.number); return;
        const selectedAnswerIndex = selectedChoice.dataset.number
        // console.log(selectedAnswerIndex);
        let classToApply = selectedAnswerIndex == (ANSWERINDEX) ? 'correct':'incorrect'
 
 
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            SOUNDCORRECT.play()
        }else{
            SOUNDINCORRECT.play()
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