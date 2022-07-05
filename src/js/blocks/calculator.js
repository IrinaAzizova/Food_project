const calculator = () => {

    const total = document.querySelector('.calculating__result span'),
          sexElems = document.querySelectorAll('[data-toggle]'),
          activityElems = document.querySelectorAll('[data-factor]'),
          heightElem = document.querySelector('#height'),
          weightElem = document.querySelector('#weight'),
          ageElem = document.querySelector('#age');

    let sex = !localStorage.getItem('sex') ? 'men' : localStorage.getItem('sex'),
        activity = !localStorage.getItem('activity') ? '1.375' : localStorage.getItem('activity'),
        height = (!localStorage.getItem('height') || localStorage.getItem('height') === 'NaN') ? '' : localStorage.getItem('height'),
        weight = (!localStorage.getItem('weight') || localStorage.getItem('weight') === 'NaN') ? '' : localStorage.getItem('weight'),
        age = (!localStorage.getItem('age') || localStorage.getItem('age') === 'NaN') ? '' : parseFloat(localStorage.getItem('age'));

        console.log(localStorage.getItem('weight'));

    heightElem.value = height;
    weightElem.value = weight;
    ageElem.value = age;

    function setActiveClass(elems) {
        elems.forEach(elem => {
            elem.classList.remove('calculating__choose-item_active');
            if (elem.getAttribute('data-toggle') && elem.getAttribute('data-toggle') === sex){
                elem.classList.add('calculating__choose-item_active');
            } else if (elem.getAttribute('data-factor') && elem.getAttribute('data-factor') == activity) {
                elem.classList.add('calculating__choose-item_active');
            }
        });
    }

    function caloryCalculation() {
        if (!height || !weight || !age) {
            total.textContent = '____';
        } else {
            if (sex === 'men') {
                total.textContent = Math.round((88.36 + (13.4 * parseFloat(weight)) + (4.8 * parseFloat(height)) - (5.7 * parseFloat(age))) * parseFloat(activity));
            } else {
                total.textContent = Math.round((447.6 + (9.2 * parseFloat(weight)) + (3.1 * parseFloat(height)) - (4.3 * parseFloat(age))) * parseFloat(activity));
            }
        }
    }

    function calorieСountingByClick(elems) {
        elems.forEach(item => {
            item.addEventListener('click', (event) => {
                if (item.getAttribute('data-toggle')) {
                    sex = event.target.getAttribute('data-toggle');
                    localStorage.setItem('sex', sex);
                }
                if (item.getAttribute('data-factor')) {
                    activity = event.target.getAttribute('data-factor');
                    localStorage.setItem('activity', activity);
                }            
                setActiveClass(elems);
                caloryCalculation();
            });
        });
    }

    function checkInputs(input) {
        let target = event.target
        const notDiggits = /[a-zа-я\-\:\"\*\@\/\[\]\{\}]/ig;
        if (input) {
            if (input.match(/\,/ig)) {
                target.value = target.value.replace(/\,/ig, '.');
            }
            if (target.value[0] === '.') {
                target.value = target.value.replace(/\./ig, '');
            }
            if (target.value.match(/[\.\.]/ig)) {
                target.value = target.value.replace(/\.\./ig, '.');
            }
            if (input.match(notDiggits) && !input.match(/\./g)) {
                target.value = target.value.replace(notDiggits, '');
            }
            if (target.value.match(/\./ig) && target.value.match(/\./ig).length > 1){
                target.value = target.value.slice(0, target.value.search(/\./i) + 1);
                console.log(target.value.slice(target.value.search(/\./i)));
            }
        }        
    }

    function calorieCountingByInput(elem){
        elem.addEventListener('input', (event) => {
            checkInputs(event.data);

            if (elem.id === 'height') {
                height = parseFloat(event.target.value);
                localStorage.setItem('height', event.target.value);

                if (height > 250) {
                    heightElem.style.border = '1px solid red';
                } else {
                    heightElem.style.border = 'none';
                }
            }

            if (elem.id === 'weight') {
                weight = parseFloat(event.target.value);
                localStorage.setItem('weight', event.target.value);

                if (weight > 300) {
                    weightElem.style.border = '1px solid red';
                } else {
                    weightElem.style.border = 'none';
                }
            }

            if (elem.id === 'age') {
                if (event.target.value > 110 || event.target.value < 0) {
                    ageElem.style.border = '1px solid red';
                } else {
                    ageElem.style.border = 'none';
                }

                age = parseFloat(event.target.value);                
                localStorage.setItem('age', event.target.value);
            }
            caloryCalculation();
        });
    }

    setActiveClass(sexElems);
    setActiveClass(activityElems);
    caloryCalculation();

    calorieСountingByClick(sexElems);
    calorieСountingByClick(activityElems);

    calorieCountingByInput(heightElem);
    calorieCountingByInput(weightElem);
    calorieCountingByInput(ageElem);
};

export default calculator;