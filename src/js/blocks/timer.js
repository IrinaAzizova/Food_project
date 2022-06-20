const timer = (deadLine, daysSelector, hoursSelector, minutesSelector, secondsSelector) => {

    const days = document.querySelector(daysSelector),
        hours = document.querySelector(hoursSelector),
        minutes = document.querySelector(minutesSelector),
        seconds = document.querySelector(secondsSelector),
        end = (new Date(deadLine)).getTime();
    let timeLeft;
    
    let startTimer = setTimeout(setTime, 1000);
    setTime();

    function setTime() {   
        timeLeft = end - (new Date()).getTime();
        if (timeLeft < 0) {
            timeLeft = 0;
            clearInterval(startTimer);
        } 
        const day = Math.floor(timeLeft /(1000 * 60 * 60 * 24)),
              hour = Math.floor(timeLeft / (1000 * 60 * 60) % 24),
              min = Math.floor(timeLeft /(1000 * 60) % 60),
              sec = Math.floor(timeLeft /1000 % 60);

        function getZero(num) {
            if (num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        days.textContent = getZero(day);
        hours.textContent = getZero(hour);
        minutes.textContent = getZero(min);
        seconds.textContent = getZero(sec); 
        console.log('ok');
        if (timeLeft > 0) {
            startTimer = setTimeout(setTime, 1000);
        }
    }   
};

export default timer;