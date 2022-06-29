import getResource from "./getResource";
import axios from "axios";

const menuCards = () => {
    class Card {
        constructor(src, altimg, tittle, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = altimg;
            this.tittle = tittle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parentElement = document.querySelector(parentSelector);
            this.transfer = 60;
            this.changeToRub();
        }
        changeToRub() {
            return this.price *= this.transfer;
        }

        render() {
            const cardItem = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                cardItem.classList.add(this.classes);
            } else {
                this.classes.forEach(eachClass => cardItem.classList.add(eachClass));
            }
            cardItem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.tittle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parentElement.append(cardItem);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(json => 
            json.forEach(({img, altimg, title, descr, price}) => 
                new Card(img, altimg, title, descr, price, '.menu__field .container', 'menu__item')
                    .render()
            )
        );

    /* _____Create cards with using axios library____
    
    axios.get('http://localhost:3000/menu')
        .then(response => 
            response.forEach(({img, altimg, title, descr, price}) => 
                new Card(img, altimg, title, descr, price, '.menu__field .container', 'menu__item')
                    .render()
            )); */
};

export default menuCards;