const hideModal = (modalSelector = '.modal') => { 
    const modalWindiw = document.querySelector(modalSelector);       
    modalWindiw.style.display = 'none';
    document.body.style.overflow = 'visible';
    document.body.style.marginRight = 0;
};

export default hideModal;