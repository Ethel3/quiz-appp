const question = document.querySelector("#question");
const choices = Array.from[document.querySelectorAll(".choice-text")];
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = {}

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '31',
        choice4: '5',
        answer: 2,
    },

    {
        question: 'Who is the current president of USA?',
        choice1: 'Barak Obama',
        choice2: 'Donald Trump',
        choice3: 'Joe Biden ',
        choice4: 'Queen Elizabeth',
        answer: 3,
    },

    {
        question: 'Which political party is ruling in Ghana currently?',
        choice1: 'NPP',
        choice2: 'PPP',
        choice3: 'CPP',
        choice4: 'NDC',
        answer: 1,
    },
    {
        question: 'what is the name of the Tallest Mountain in Ghana?',
        choice1: 'Mount Afadja',
        choice2: 'Mount Aduada',
        choice3: 'Mount Atiwiredu',
        choice4: 'Mount Kwamisa',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS){
        localStorage.setItems('mostRecentScore', score)

        return window.location.assign('/end.html')
        
    }

    questionCounter++
    progressText.InnerText = 'Question ${questionCounter} of ${MAX_QUESTION}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question


    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice' + number]
    })
    
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
   choice.addEventListener ('click', e=>{
       if(!acceptingAnswers) return
       
       acceptingAnswers = false
       const selectedChoice = e.target
       const selectedAnswer = selectedChoice.dataset['number']

       let classToApply = selectedAnswer = currentQuestion.answer ? 'correct':
       'incorrect'


       if(classToApply === 'correct') {
           incrementScore(SCORE_POINTS)
       }

       selectedChoice.parentElement.classList.add(classToApply)

       setTimeout(() =>{
           selectedChoice.parentElement.classList.remove(classToApply)
           getNewQuestion()

       },1000)
   })
})