import getResource from "./getResource";
import addZero from "./addZero";

const slider = ({prevBtnSelector, nextBtnSelector,
                totalNumSelector, currentNumSelector,
                parentSelector, slideSelector}) => {
    const offerSlider = document.querySelector(slideSelector),
          sliderWrapper = document.querySelector(parentSelector),
          prevBtn = document.querySelector(prevBtnSelector),
          nextBtn = document.querySelector(nextBtnSelector),
          total = document.querySelector(totalNumSelector),
          currentNum = document.querySelector(currentNumSelector),
          width = parseInt(window.getComputedStyle(sliderWrapper).width);
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
                slide.classList.add('offer__slide',);
                slide.animate([
                    {left: `${width}px`},
                    {left: '0px'}
                ], 500);
                this.parentNode.append(slide);
            } else if (direction === 'prev') {
                slide.classList.add('offer__slide');
                slide.animate([
                    {left: `${-width}px`},
                    {left: '0px'}
                ], 500);
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

    class SlideNavigation {
        constructor(numOfSlides, parentNode){
            this.numOfSlides = numOfSlides;
            this.parentNode = parentNode;
        }

        render() {
            const dotWrapper = document.createElement('div');
            dotWrapper.classList.add('carousel-indicators');
            this.parentNode.append(dotWrapper);
            for (let i = 0; i < this.numOfSlides; i++){
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dotWrapper.append(dot);
            }
        }
    }    

    function showCurrentDot(index, dotsSelector) {
        const dots = document.querySelectorAll(dotsSelector);
        dots.forEach((dot, i) => {
            dot.classList.remove('dot-active');
        });
        dots[index].classList.add('dot-active');
    }

    getResource('http://localhost:3000/slides')
        .then(data => {
            total.textContent = addZero(data.length);
            showCurrentSlide(data);
            new Slide(data[index][1], data[index][0]).render('next');
            new SlideNavigation(data.length, offerSlider).render();
            showCurrentDot(index, '.dot');
            return data;
        }).then(data =>{

            const showNextSlide = () => {
                index++;
                showCurrentSlide(data);
                showCurrentDot(index, '.dot');
                new Slide(data[index][1], data[index][0]).render('next');
                offerSlider.querySelector('.offer__slider-wrapper').firstElementChild.animate([
                    {left: '0px'},
                    {left: `${-width}px`}
                ], 500);
                nextBtn.removeEventListener('click', showNextSlide);
                setTimeout(() => {
                    offerSlider.querySelector('.offer__slider-wrapper').firstElementChild.remove();
                    nextBtn.addEventListener('click', showNextSlide);
                }, 500);
            };
            nextBtn.addEventListener('click', showNextSlide);

            const showPrevSlide = () => {
                index--;
                showCurrentSlide(data);
                showCurrentDot(index, '.dot');
                new Slide(data[index][1], data[index][0]).render('prev');
                offerSlider.querySelector('.offer__slider-wrapper').lastElementChild.animate([
                    {left: '0px'},
                    {left: `${width}px`}
                ], 500);
                prevBtn.removeEventListener('click', showPrevSlide);
                setTimeout(() => {
                    offerSlider.querySelector('.offer__slider-wrapper').lastElementChild.remove();
                    prevBtn.addEventListener('click', showPrevSlide);
                }, 500);
            };
            prevBtn.addEventListener('click', showPrevSlide);

            const dots = offerSlider.querySelectorAll('.dot');
            dots.forEach((eachDot, i) => {
                eachDot.addEventListener('click', (event) => {
                    dots.forEach(dot => dot.classList.remove('dot-active'));
                    event.target.classList.add('dot-active');
                    if (i > index) {

                        index = i - 1;
                        showNextSlide();
                    } else if (i < index) {
                        index = i + 1;
                        showPrevSlide();
                    }                     
                    showCurrentDot(index, '.dot');
                });                
            });            
        });        
};

export default slider;