let stopwatchInterval;
let runningTime = 0;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapsContainer = document.getElementById('laps');

function startStop() {
  const isRunning = !!stopwatchInterval;
  
  if (isRunning) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    startStopBtn.textContent = 'Start';
  } else {
    if (!runningTime) {
      reset();
    }
  
    const startTime = Date.now() - runningTime;
    stopwatchInterval = setInterval(() => {
      runningTime = Date.now() - startTime;
      display.textContent = formatTime(runningTime);
    }, 10);
    startStopBtn.textContent = 'Stop';
  }
}

function recordLap() {
  if (!stopwatchInterval) return; // ignore if stopwatch isn't running
  const li = document.createElement('li');
  li.textContent = formatTime(runningTime);
  lapsContainer.appendChild(li);
}

function reset() {
  runningTime = 0;
  display.textContent = formatTime(runningTime);
  lapsContainer.innerHTML = ''; // clear the laps
  if (!stopwatchInterval) {
    startStopBtn.textContent = 'Start';
  }
}

function leadingZero(time) {
  return time.toString().padStart(2, '0');
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const fraction = Math.floor((milliseconds % 1000) / 10);
  
  return `${leadingZero(minutes)}:${leadingZero(seconds)}.${leadingZero(fraction)}`;
}

// initial reset of the stopwatch
reset();