import addZero from "./addZero";

const timer = (deadLine, daysSelector, hoursSelector, minutesSelector, secondsSelector) => {

    const days = document.querySelector(daysSelector),
        hours = document.querySelector(hoursSelector),
        minutes = document.querySelector(minutesSelector),
        seconds = document.querySelector(secondsSelector),
        end = (new Date(deadLine)).getTime();
    let time;
    
    let startTimer = setTimeout(setTime, 1000);
    setTime();

    function getTime() {
        time = end - (new Date()).getTime();
        
        const d = Math.floor(time /(1000 * 60 * 60 * 24)),
              h = Math.floor(time / (1000 * 60 * 60) % 24),
              m = Math.floor(time /(1000 * 60) % 60),
              s = Math.floor(time /1000 % 60);

        return {time, d, h, m, s};
    } 
    
    function setTime() {   
        const result = getTime();

        days.textContent = addZero(result.d);
        hours.textContent = addZero(result.h);
        minutes.textContent = addZero(result.m);
        seconds.textContent = addZero(result.s); 
        
        if (result.time > 0) {
            startTimer = setTimeout(setTime, 1000);
        }
    }   
};

export default timer;