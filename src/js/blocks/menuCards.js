const menuCards = () => {
    class Card {
        constructor(src, alt, tittle, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
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

    new Card(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu__field .container'
    ).render();

    new Card(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu__field .container',
        'menu__item'
    ).render();

    new Card(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu__field .container',
        'menu__item'
        ).render();
};

export default menuCards;