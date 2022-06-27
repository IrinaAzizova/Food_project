import hideModal from "./hideMidal";
import openModal from "./openModal";

const sendForm = () => {
    
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо! Скоро мы свяжемся с вами',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        postData(item);
    });
    
    function postData(form) {

        form.addEventListener('submit', event => {
            event.preventDefault(); 

            function showThanksModal(message) {
                const modalForm = document.querySelector('.modal__form');
                modalForm.style.display = 'none';
                const thanks = document.createElement('div');
                thanks.classList.add('modal__form');
                thanks.innerHTML = `
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                `;
                document.querySelector('.modal__content').append(thanks);
                openModal();

                setTimeout(() => {                            
                    hideModal(); 
                    thanks.remove();
                    modalForm.style.display = 'block';
                }, 2000);
            }

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');            
            const formData = new FormData(form);
            console.log(formData);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            const json = JSON.stringify(object);
            request.send(json);
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    showThanksModal(message.success);

                } else {
                    showThanksModal(message.failure);                            
                }
                setTimeout(() => {
                    statusMessage.remove();
                    form.reset();
                } , 2000);     
            });
        });
    }
};

export default sendForm;