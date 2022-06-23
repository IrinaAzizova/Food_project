import getScrollbarWidth from "./getScrollbarWidth";

const modal = (triggerSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
          modalWindiw = document.querySelector('.modal'),
          close = modalWindiw.querySelector('[data-close]');

    function openModal() {
        modalWindiw.classList.add('animate__fadeIn');
        modalWindiw.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${getScrollbarWidth()}px`;
        clearInterval(modalTimer);
    }

    function hideModal() {        
        modalWindiw.style.display = 'none';
        document.body.style.overflow = 'visible';
        document.body.style.marginRight = 0;
    }    

    triggers.forEach(item => {
        item. addEventListener('click', openModal);
    });

    close.addEventListener('click', hideModal);

    modalWindiw.addEventListener('click', (event) => {
        if (event.target && event.target.matches('.modal')) {
            hideModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modalWindiw.style.display === 'block') {
            hideModal();
        }
    });

    const modalTimer = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
};

export default modal;