import getScrollbarWidth from "./getScrollbarWidth";


function openModal() {
    const modalWindiw = document.querySelector('.modal');
    modalWindiw.classList.add('animate__fadeIn');
    modalWindiw.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${getScrollbarWidth()}px`;
    clearInterval(modalTimer);
}

const modalTimer = setTimeout(openModal, 50000);

export default openModal;