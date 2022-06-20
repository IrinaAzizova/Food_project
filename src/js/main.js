'use strict';

import tabs from "./blocks/tabs";
import timer from "./blocks/timer";


document.addEventListener('DOMContentLoaded', () =>{
    
    tabs('.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timer('2022-06-20T13:00:00', '#days', '#hours', '#minutes', '#seconds');
});