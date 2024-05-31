(function () {
    emailjs.init("KBy-70Mfv0nUNKhOd");
})();


function sendEmail(event) {
    const errorsMap = {
        'nameBg': 'Моля попълнете вашето име.',
        'phoneBg': 'Моля попълнете вашият телефон.',
        'emailBg': 'Моля попълнете вашата поща.',
        'messageBg': 'Моля напишете вашето съобщение.',
        'nameEn': 'Please fill your name.',
        'phoneEn': 'Please fill your phone.',
        'emailEn': 'Please fill your email',
        'messageEn': 'Please fill your message',
    }
    event.preventDefault();
    const parentElement = event.currentTarget.closest('form');
    const [name, email, phone, description, message] = parentElement.querySelectorAll('.input-field');
    for (const data of [name, email, phone, message]) {
        if (!data.value) {
            alert(errorsMap[data.id]);
            return;
        }
    }
    const emailParams = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        description: description.value,
        message: message.value,
    };


    emailjs.send("service_3d5g4qo", "template_lm05wnu", emailParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            for (const data of [name, email, phone, message, description]) {
                data.value = '';
            }
            if (name.id === 'nameBg'){
                alert('Съобщението ви беше изпратено успешно!');
            }else {
                alert('Email sent successfully!');
            }
        }, function (error) {
            console.log('FAILED...', error);
            if (name.id === 'nameBg'){
                alert('Неуспешно изпращане, моля опитайне отново!');
            }else {c
                 alert('Failed to send email. Please try again!');
            }

        });
}


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form').forEach(e => e.addEventListener('submit', sendEmail));
});
