'use strict';

import "core-js/stable";

import tabs from "./blocks/tabs";
import timer from "./blocks/timer";
import modal from "./blocks/modal";
import menuCards from "./blocks/menuCards";
import sendForm from "./blocks/forms";
import slider from "./blocks/slider";
import calculator from "./blocks/calculator";


document.addEventListener('DOMContentLoaded', () =>{
    
    tabs('.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timer('2022-07-01T00:00:00', '#days', '#hours', '#minutes', '#seconds');
    modal('[data-modal]', '.modal');
    menuCards();
    sendForm();
    slider({prevBtnSelector: '.offer__slider-prev',
            nextBtnSelector: '.offer__slider-next',
            totalNumSelector: '#total',
            currentNumSelector: '#current',
            parentSelector: ".offer__slider-wrapper",
            slideSelector: '.offer__slider'});
    calculator();
});

