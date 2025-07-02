const timerDisplay = document.getElementById('timer-display');
const cycleDisplay = document.getElementById('cycle-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

let timer;
let timeLeft;
let isWorking = true; // true: 作業時間, false: 休憩時間
let cycleCount = 1;
const WORK_TIME = 25 * 60; // 25分
const BREAK_TIME = 5 * 60; // 5分
const LONG_BREAK_TIME = 15 * 60; // 長い休憩時間 (4サイクルごと)
const TOTAL_CYCLES = 6;

const alarmSound = new Audio('alarm.mp3'); // アラーム音のファイルパス

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateCycleDisplay() {
    cycleDisplay.textContent = `${isWorking ? '作業' : '休憩'} ${cycleCount}/${TOTAL_CYCLES}`;
    document.body.className = isWorking ? 'working' : 'breaking';
}

function startTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startButton.textContent = 'スタート';
        return;
    }

    startButton.textContent = '一時停止';
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            alarmSound.play();

            if (isWorking) {
                cycleCount++;
                if (cycleCount > TOTAL_CYCLES) {
                    // 全サイクル終了
                    cycleDisplay.textContent = '完了！';
                    startButton.style.display = 'none';
                    resetButton.textContent = '最初から';
                    return;
                }
                isWorking = false;
                timeLeft = (cycleCount % 4 === 0) ? LONG_BREAK_TIME : BREAK_TIME; // 4サイクルごとに長い休憩
            } else {
                isWorking = true;
                timeLeft = WORK_TIME;
            }
            updateCycleDisplay();
            startTimer(); // 次のタイマーを自動開始
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorking = true;
    cycleCount = 1;
    timeLeft = WORK_TIME;
    startButton.textContent = 'スタート';
    startButton.style.display = 'inline-block';
    resetButton.textContent = 'リセット';
    updateTimerDisplay();
    updateCycleDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// 初期表示
resetTimer();
