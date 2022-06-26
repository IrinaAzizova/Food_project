const sendForm = () => {
    
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы свяжемся с вами',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        postData(item);
    });
    
    function postData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault(); 

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');            
            const formData = new FormData(form);
            console.log(formData);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            const json = JSON.stringify(object);
            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    statusMessage.textContent = message.success;
                    console.log(request.response);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                    
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
};

export default sendForm;