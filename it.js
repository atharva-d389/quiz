
const questions = [
    {
        question: "Prolog comes under which category of programming languages?",
        options: [
            "A) Logical Programming",
            "B) Procedural Programming",
            "C) Oop(object oriented programming",
            "D) Functional programmming"
        ],
        correctAnswer: "A"
    },
    {
        question: "Is Java a procedural programming language",
        options: [
            "A) True",
            "B) False",
            "C) None of the above",
            "D) Not sure"
        ],
        correctAnswer: "B"
    },
    {
        question: "What term describes a program that can execute high-level language programs?",
        options: [
            "A) Compiler",
            "B) Interpreter",
            "C) Sensor",
            "D) Circuitry"
        ],
        correctAnswer: "B"
    },
    {
        question: "What are executables often called?",
        options: [
          "A) Native code",
          "B) Computable code",
          "C) executable code",
          "D) Machine code"
        ],
        correctAnswer: "A"
    },
    {
        question: "What is the intermediate form to which a source program is compiled?",
        options: [
        "A) Byte code",
        "B) Smart code",
        "C) Executable code",
        "D) machine code"
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
