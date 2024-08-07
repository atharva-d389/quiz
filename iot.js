

const questions = [
    {
        question: "What is the primary goal of iot?",
        options: [
            "A) To increase internet speed globally",
            "B) To network physical devices",
            "C) To increase smartphone usage",
            "D) To improve social media platforms"
        ],
        correctAnswer: "A"
    },
    {
        question: "Which of the following is a common application of IoT technology",
        options: [
            "A) Autoamted Email system",
            "B) Voice activated shopping",
            "C) Smart homes",
            "D) Text messaings"
        ],
        correctAnswer: "C"
    },
    {
        question: "IoT devices typically communicate through which of the following methods?",
        options: [
            "A) Human intervention",
            "B) Direct cable connections ",
            "C) Internet protocols",
            "D) Sound waves"
        ],
        correctAnswer: "C"
    },
    {
        question: "What role do sensor play in iot devices?",
        options: [
          "A) Providing user interface",
          "B) Storing data",
          "C) Converting physical parametres into physical data",
          "D) Encrypting data"
        ],
        correctAnswer: "A"
    },
    {
        question: "In the context of IoT, what is “edge computing?",
        options: [
        "A) Computing done on central servor",
        "B) Computing done on edge of a network",
        "C) Computing done in the cloud",
        "D) Computing done on smartphones"
        ],
        correctAnswer: "B"
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
