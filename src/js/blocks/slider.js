import getResource from "./getResource";
import addZero from "./addZero";

const slider = (prevBtnSelector, nextBtnSelector,
                totalNumSelector, currentNumSelector,
                parentSelector) => {
    const prevBtn = document.querySelector(prevBtnSelector),
          nextBtn = document.querySelector(nextBtnSelector),
          total = document.querySelector(totalNumSelector),
          currentNum = document.querySelector(currentNumSelector);
    let index = 0;     

    class Slide {
        constructor(imgSrc, altImg, parent = parentSelector) {
            this.imgSrc = imgSrc;
            this.altImg = altImg;
            this.parentNode = document.querySelector(parent);
        }

        render() {
            const slide = document.createElement('div');
            slide.classList.add('offer__slide', 'animate__fadeIn');
            slide.innerHTML = `
                <img src=${this.imgSrc} alt=${this.altImg}>
            `;
            this.parentNode.innerHTML = '';
            this.parentNode.append(slide);
        }
    }

    function showCurrentSlide(data) {        
        if (index >= data.length) {
            index = 0;
        }
        if (index < 0) {
            index = data.length - 1;
        }
        currentNum.textContent = addZero(index + 1);        
        new Slide(data[index][1], data[index][0]).render();
    }   

    getResource('http://localhost:3000/slides')
        .then(data => {
            data.forEach(item => 
                new Slide(item[1], item[0]).render());
            total.textContent = addZero(data.length);
            showCurrentSlide(data);

            nextBtn.addEventListener('click', () => {
                index++;
                showCurrentSlide(data);
            });

            prevBtn.addEventListener('click', () => {
                index--;
                showCurrentSlide(data);
            });
        });
};

export default slider;