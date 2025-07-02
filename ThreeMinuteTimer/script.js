const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let timer;
let timeLeft = 180;
let isTimerRunning = false;

const alarmSound = new Audio('alarm.mp3'); // アラーム音のファイルパス

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    if (percent <= 25) {
        circle.style.stroke = '#fdbb2d'; // 黄色
    } else if (percent <= 50) {
        circle.style.stroke = '#b21f1f'; // 赤
    } else {
        circle.style.stroke = '#1a2a6c'; // 青
    }
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const percent = (timeLeft / 180) * 100;
    setProgress(percent);

    if (timeLeft <= 10 && timeLeft > 0) {
        timerDisplay.classList.add('pulsing');
    } else {
        timerDisplay.classList.remove('pulsing');
    }
}

function startTimer() {
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
        startButton.textContent = 'スタート';
    } else {
        isTimerRunning = true;
        startButton.textContent = 'ストップ';
        timer = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(timer);
                isTimerRunning = false;
                startButton.textContent = 'リセット';
                alarmSound.play();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    timeLeft = 180;
    updateTimer();
    startButton.textContent = 'スタート';
}

startButton.addEventListener('click', () => {
    if (timeLeft === 0) {
        resetTimer();
    } else {
        startTimer();
    }
});

updateTimer();
