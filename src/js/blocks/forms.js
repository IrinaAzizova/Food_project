import hideModal from "./hideMidal";
import openModal from "./openModal";
import postData from "./postData";

const sendForm = () => {
    
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо! Скоро мы свяжемся с вами',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
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

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            /* .then(data => data.text()) */
            .then(data => {
                console.log(data);
                    showThanksModal(message.success);
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                statusMessage.remove();
                form.reset();
            });
        });
    }
};

export default sendForm;