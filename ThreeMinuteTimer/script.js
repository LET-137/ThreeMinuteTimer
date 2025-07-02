const timerDisplay = document.getElementById('timer-display');
const progressBar = document.getElementById('progress-bar');
const startButton = document.getElementById('start-button');

let timer;
let timeLeft = 180;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    progressBar.value = 180 - timeLeft;
}

function startTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startButton.textContent = 'スタート';
        timeLeft = 180;
        updateTimer();
    } else {
        timer = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(timer);
                timer = null;
                startButton.textContent = 'リセット';
            }
        }, 1000);
        startButton.textContent = 'リセット';
    }
}

startButton.addEventListener('click', startTimer);

updateTimer();
