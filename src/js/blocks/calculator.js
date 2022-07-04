const calculator = (totalSelector) => {
    const total = document.querySelector(totalSelector),
          sexElems = document.querySelectorAll('[data-toggle]'),
          activityElems = document.querySelectorAll('[data-factor]');

    const growthElem = document.querySelector('#height'),
          weightElem = document.querySelector('#weight'),
          ageElem = document.querySelector('#age');

    let sex = !localStorage.getItem('sex') ? 'women' : localStorage.getItem('sex'),
        activity = !localStorage.getItem('activity') ? "1.375" : localStorage.getItem('activity'),
        growth = !localStorage.getItem('growth') ? '' : localStorage.getItem('growth') === 'NaN' ? '' : localStorage.getItem('growth'),
        weight = !localStorage.getItem('weight') ? '' : localStorage.getItem('weight') === 'NaN' ? '' : localStorage.getItem('weight'),
        age = !localStorage.getItem('age') ? '' : localStorage.getItem('age') === 'NaN' ? '' : localStorage.getItem('age');

    growthElem.value = growth;
    weightElem.value = weight;
    ageElem.value = age;

    function setActiveClass(items) {
        items.forEach(elem => {
            elem.classList.remove('calculating__choose-item_active');
            if (elem.getAttribute('data-toggle') === sex) {
                elem.classList.add('calculating__choose-item_active');
            }
            if (elem.getAttribute('data-factor') == activity) {
                elem.classList.add('calculating__choose-item_active');
            }
        });
    }

    function caloryCalculation() {
        if (!growth || !weight || !age) {
            total.textContent = '____';
        } else {
            if (sex === 'men') {
                console.log(activity);
                total.textContent = Math.round((88.36 + (13.4 * parseFloat(weight)) + (4.8 * parseFloat(growth)) - (5.7 * parseFloat(age))) * parseFloat(activity));
            } else {
                total.textContent = Math.round((447.6 + (9.2 * parseFloat(weight)) + (3.1 * parseFloat(growth)) - (4.3 * parseFloat(age))) * parseFloat(activity));
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

    function calorieCountingByInput(elem) {
        const notDiggits = /[a-zа-я\-\:\"]/ig;
        elem.addEventListener('input', (event) => {
            if (event.data && event.data.match(/\,/ig)) {
                event.target.value = event.target.value.replace(/\,/ig, '.');
            } else if (event.data && event.data.match(/[\.\.]/ig)) {
                event.target.value = event.target.value.replace(/\.\./ig, '.');
            } else if (event.data && event.data.match(notDiggits) && !event.data.match(/\./g)) {
                event.target.value = event.target.value.replace(notDiggits, '');
            }
            
            if (elem.getAttribute('id') === 'height') {
                growth = parseFloat(event.target.value);
                localStorage.setItem('growth', growth);
                console.log(growth);
            }

            if (elem.getAttribute('id') === 'weight') {
                weight = parseFloat(event.target.value);
                localStorage.setItem('weight', event.target.weight);
                console.log(weight);
            }

            if (elem.getAttribute('id') === 'age') {
                age = parseFloat(value);
                localStorage.setItem('age', age);
                console.log(age);
            }
            
            caloryCalculation();
        });

    }

    setActiveClass(sexElems);
    setActiveClass(activityElems);
    caloryCalculation();

    calorieСountingByClick(sexElems);
    calorieСountingByClick(activityElems);

    calorieCountingByInput(growthElem);
    calorieCountingByInput(weightElem);
    calorieCountingByInput(ageElem);

};

export default calculator;