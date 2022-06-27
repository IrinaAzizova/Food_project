import hideModal from "./hideMidal";
import openModal from "./openModal";

const modal = (triggerSelector, modalWindowSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
          modalWindiw = document.querySelector(modalWindowSelector),
          form = document.querySelector('form.modal__form');



    triggers.forEach(item => {
        item. addEventListener('click', openModal);
    });

    modalWindiw.addEventListener('click', (event) => {
        if (event.target && event.target.matches('.modal') || event.target.matches('.modal__close')) {
            hideModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modalWindiw.style.display === 'block') {
            hideModal();
        }
    });

    const modalTimer = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

};

export default modal;