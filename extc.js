

const questions = [
    {
        question: "What is the purpose of flip-flop in digital circuits?",
        options: [
            "A) To amplify signals",
            "B) To store binary data",
            "C) To perform arithmetic operations",
            "D) To generate clock pulses"
        ],
        correctAnswer: "B"
    },
    {
        question: "Which modulation technique is commonly used for transmitting analog voice signals over long distances?",
        options: [
            "A) Frequency modulation (FM)",
            "B) Amplitude modulation (AM)",
            "C) Phase modulation (PM)",
            "D) Pulse code modulation (PCM)"
        ],
        correctAnswer: "A"
    },
    {
        question: "What is the purpose of a Schmitt trigger circuit?",
        options: [
            "A) To generate square waves",
            "B) To amplify audio signals",
            "C) To stabilize voltage levels",
            "D) To filter high-frequency noise"
        ],
        correctAnswer: "A"
    },
    {
        question: "Which transmission medium has the highest bandwidth?",
        options: [
          "A)Coaxial cable",
          "B) Fiber optic cable",
          "C) Twisted pair cable",
          "D) Wireless communication"
        ],
        correctAnswer: "B"
    },
    {
        question: "What is the Nyquist theorem related to?",
        options: [
        "A) Sampling rate in digital audio",
        "B) Maximum data rate in optical fibers",
        "C) Noise immunity in communication channels",
        "D) Antenna design for radio waves"
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
