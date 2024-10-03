const quizData = {
    questions: [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            correctAnswer: 1
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Fe", "Au", "Cu"],
            correctAnswer: 2
        }
    ]
};

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let quizStartTime;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const timeTakenElement = document.getElementById('time-taken');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const totalQuestionsSpan = document.getElementById('total-questions');
const currentQuestionSpan = document.getElementById('current-question');
const totalSpan = document.getElementById('total');
const questionsAttemptedElement = document.getElementById('questions-attempted');


function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    totalQuestionsSpan.textContent = quizData.questions.length;
    totalSpan.textContent = quizData.questions.length;
    updateQuestionNumber();
}

function updateQuestionNumber() {
    currentQuestionSpan.textContent = currentQuestion + 1;
}

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    quizStartTime = new Date();
    initializeQuiz();
    loadQuestion();
}


function loadQuestion() {
    const question = quizData.questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    timeLeft = 15;
    updateTimer();

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });

    nextButton.disabled = true;
    startTimer();
    updateQuestionNumber();  
}


function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            lockOptions();
            nextButton.disabled = false;
        }
    }, 1000);
}


function updateTimer() {
    timerElement.textContent = timeLeft;
}


function selectOption(index) {
    const selectedButton = optionsElement.children[index];
    const correctIndex = quizData.questions[currentQuestion].correctAnswer;

    
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
    });

    
    if (index === correctIndex) {
        selectedButton.classList.add('correct'); 
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        selectedButton.classList.add('incorrect');  
        
        optionsElement.children[correctIndex].classList.add('correct');
    }

    
    nextButton.disabled = false;
    clearInterval(timer);
}

// Lock options when time runs out
function lockOptions() {
    const correctIndex = quizData.questions[currentQuestion].correctAnswer;
    Array.from(optionsElement.children).forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });
}

// Go to the next question
nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

// End the quiz
function endQuiz() {
    clearInterval(timer);
    const timeTaken = (new Date() - quizStartTime) / 1000;
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    finalScoreElement.textContent = `Your final score is: ${score}`;
    questionsAttemptedElement.textContent = `You attempted ${quizData.questions.length} questions`;
    timeTakenElement.textContent = `You took ${timeTaken.toFixed(2)} seconds`;
}

// Restart the quiz
restartButton.addEventListener('click', startQuiz);
startButton.addEventListener('click', startQuiz);
