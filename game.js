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
        question: '?',
        choice1: '2',
        choice2: '4',
        choice3: '31',
        choice4: '5',
        answer: 2,
    },
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '31',
        choice4: '5',
        answer: 2,
    },
]