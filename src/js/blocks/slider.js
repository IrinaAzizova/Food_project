import getResource from "./getResource";
import addZero from "./addZero";

const slider = (prevBtnSelector, nextBtnSelector,
                totalNumSelector, currentNumSelector,
                parentSelector) => {
    const prevBtn = document.querySelector(prevBtnSelector),
          nextBtn = document.querySelector(nextBtnSelector),
          total = document.querySelector(totalNumSelector),
          currentNum = document.querySelector(currentNumSelector),
          width = parseInt(window.getComputedStyle(document.querySelector(parentSelector)).width);
          console.log(width);
    let index = 0;   
    


    class Slide {
        constructor(imgSrc, altImg, parent = parentSelector) {
            this.imgSrc = imgSrc;
            this.altImg = altImg;
            this.parentNode = document.querySelector(parent);
        }

        render(direction) {
            const slide = document.createElement('div');            
            slide.innerHTML = `
                <img src=${this.imgSrc} alt=${this.altImg}>
            `;
            if (direction === 'next'){
                slide.classList.add('offer__slide', 'animate_nextSlide-next');
                this.parentNode.append(slide);
            } else if (direction === 'prev') {
                slide.classList.add('offer__slide', 'animate_prevSlide-prev');
                this.parentNode.insertAdjacentElement('afterbegin', slide);
            }
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
    }   


    getResource('http://localhost:3000/slides')
        .then(data => {
            total.textContent = addZero(data.length);
            showCurrentSlide(data);
            new Slide(data[index][1], data[index][0]).render('next');
            return data;
        }).then(data =>{
            const showNextSlide = () => {
                index++;
                showCurrentSlide(data);
                new Slide(data[index][1], data[index][0]).render('next');
                document.querySelector('.offer__slider-wrapper').firstElementChild.classList.remove('animate_nextSlide-next', 'animate_prevSlide-prev');
                document.querySelector('.offer__slider-wrapper').firstElementChild.classList.add('animate_nextSlide-prev');
                nextBtn.removeEventListener('click', showNextSlide);
                setTimeout(() => {
                    document.querySelector('.offer__slider-wrapper').firstElementChild.remove();
                    nextBtn.addEventListener('click', showNextSlide);
                }, 500);
            };

            nextBtn.addEventListener('click', showNextSlide);

            const showPrevSlide = () => {
                index--;
                showCurrentSlide(data);
                new Slide(data[index][1], data[index][0]).render('prev');
                document.querySelector('.offer__slider-wrapper').lastElementChild.classList.remove('animate_nextSlide-next', 'animate_prevSlide-prev');
                document.querySelector('.offer__slider-wrapper').lastElementChild.classList.add('animate_prevSlide-current');
                prevBtn.removeEventListener('click', showPrevSlide);
                setTimeout(() => {
                    document.querySelector('.offer__slider-wrapper').lastElementChild.remove();
                    prevBtn.addEventListener('click', showPrevSlide);
                }, 500);
            };
            prevBtn.addEventListener('click', showPrevSlide);
        });

        
};

export default slider;