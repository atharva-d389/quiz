

const questions = [
    {
        question: "What is a class?",
        options: [
            "A) A singleton",
            "B) An enumeration",
            "C) An object",
            "D) Ablueprint of an object"
        ],
        correctAnswer: "D"
    },
    {
        question: "What does the following statement evaluate to? true != false != true",
        options: [
            "A) True",
            "B) False",
            "C) None of the above",
            "D) Not sure"
        ],
        correctAnswer: "A"
    },
    {
        question: "When writing to a file, does the file must exist?",
        options: [
            "A) True",
            "B) False",
            "C) None of the above",
            "D) Not sure"
        ],
        correctAnswer: "B"
    },
    {
        question: " How many base cases does a well-defined recursive function have?",
        options: [
          "A) At least one base case",
          "B) At least 2 base case",
          "C) At least three base case",
          "D) None"
        ],
        correctAnswer: "A"
    },
    {
        question: "What is an algorithm?",
        options: [
        "A) A step by step series of instruction to solve the problems",
        "B) the memory segment holding references to the object",
        "C) the thread running the main method of program",
        "D) A synonym for encapsulation"
        ],
        correctAnswer: "A"
    }
];

let score = 0;
let questionIndex = 0;
let timeLeft = 60;
let timer;

function begin() {
    if (document.querySelector('input[type="checkbox"]').checked) {
        document.querySelector('.a1').style.display = 'none';
        document.querySelector('.quiz2').style.display = 'block';
        startTimer();
        loadNextQuestion();
    } else {
        alert('Please accept the rules and regulations to continue.');
    }
}

function submitAnswer() {
    clearInterval(timer);
    let selectedOption = document.querySelector('input[name="rad1"]:checked');
    if (selectedOption) {
        let selectedValue = selectedOption.value;
        if (selectedValue == questions[questionIndex].correctAnswer) {
            score += 2;
        } else {
            score -= 2;
        }
        questionIndex++;
        if (questionIndex < questions.length) {
            document.querySelector('.quiz2').style.display = 'block';
            document.querySelector('.result').style.display = 'none';
            loadNextQuestion();
            startTimer();
        } else {
            showResult();
        }
    } else {
        alert('Please select an option.');
    }
}

function showResult() {
    document.querySelector('.quiz2').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
    document.getElementById('resultMessage').innerText = "Quiz completed! Your score is " + score;
    document.getElementById('proceed').style.display = 'none';
    document.getElementById('tryAgain').style.display = 'inline';
    document.getElementById('backToAbout').style.display = 'inline';
}

function tryAgain() {
    score = 0;
    questionIndex = 0;
    document.querySelector('.quiz2').style.display = 'block';
    document.querySelector('.result').style.display = 'none';
    startTimer();
    loadNextQuestion();
}

function backToAbout() {
    window.location.href = "about.html";
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function loadNextQuestion() {
    document.getElementById('questionLabel').innerText = `Question ${questionIndex + 1}: ${questions[questionIndex].question}`;
    document.querySelectorAll('input[name="rad1"]').forEach((input, index) => {
        input.value = questions[questionIndex].options[index].charAt(0);
        input.checked = false;
        input.nextSibling.textContent = questions[questionIndex].options[index];
    });
}
