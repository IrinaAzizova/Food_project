import getScrollbarWidth from "./getScrollbarWidth";

const modal = (triggerSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
          modalWindiw = document.querySelector('.modal'),
          close = modalWindiw.querySelector('[data-close]');

    triggers.forEach(item => {
        item. addEventListener('click', () => {
            modalWindiw.classList.add('animate__fadeIn');
            modalWindiw.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${getScrollbarWidth()}px`;
        });
    });

    function hideModal() {        
        modalWindiw.style.display = 'none';
        document.body.style.overflow = 'visible';
        document.body.style.marginRight = 0;
    }

    close.addEventListener('click', () => {
        hideModal();
    });

    modalWindiw.addEventListener('click', (event) => {
        if (event.target && event.target.matches('.modal')) {
            hideModal();
        }
    });

};

export default modal;