// Get DOM elements
const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const completionMessage = document.getElementById('completion-message');

let countdownInterval;

// Event listener for Start button
startBtn.addEventListener('click', function() {
    const targetDate = new Date(datetimePicker.value).getTime();

    if (isNaN(targetDate)) {
        alert('Please select a valid date and time.');
        return;
    }

    clearInterval(countdownInterval); // Clear any existing interval

    // Update countdown every second
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            animateCompletion();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
    }, 1000);
});

// Event listener for Stop button
stopBtn.addEventListener('click', function() {
    clearInterval(countdownInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    completionMessage.classList.add('hidden');
});

// Function to format time to always show two digits (e.g., 01, 02, ..., 10)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Function to add completion animation
function animateCompletion() {
    completionMessage.classList.remove('hidden');
    document.querySelector('.timer').classList.add('complete-animation');
}
