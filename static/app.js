const navBtnElement = document.querySelectorAll('#navBtn, #navBtnBg');
const collapseMenu = document.querySelectorAll('.navigation-links');
const navigationBtnElements = document.querySelectorAll('.section-link');
const btnBackToTop = document.querySelector('.back-to-top');
const languageBtnElements = document.querySelectorAll('.language-link');
const languageImageElement = document.querySelectorAll('.flag-img img');
const imagesContainerElements = document.querySelectorAll('.image-container');

const modalContainer = document.querySelector('.modal-container');
const modalImageElement = document.querySelector('.modal-image')
const bodyElement = document.querySelector('body');
const closeModalButton = document.querySelector('.close-modal');
closeModalButton.addEventListener('click', (e) => {
    modalContainer.style.display = 'none';
    bodyElement.style.overflow = 'auto';
    modalImageElement.removeEventListener('click', zoomInZoomOut)
});

function zoomInZoomOut(event) {
    const currentElement = document.querySelector('.modal-image');
    if (currentElement.style.scale === '1' || !currentElement.style.scale) {
        currentElement.style.cursor = 'zoom-out';
        currentElement.style.scale = '1.5';
    } else if (currentElement.style.scale === '1.5') {
        currentElement.style.cursor = 'zoom-in';
        currentElement.style.scale = '1';
    }
}

function controls(idx, someLength, leftBtn, rightBtn) {
    leftBtn.disabled = idx <= 0;
    rightBtn.disabled = idx >= someLength - 1;
}

function modalImages(event) {
    const [leftBtn, rightBtn] = document.querySelectorAll('.modal-wrapper > .control-button');
    const parent = event.currentTarget.parentNode.parentNode;
    const images = Array.from(parent.querySelectorAll('.image-container'));
    const currentElement = images.find(e => e.children[0].src === event.currentTarget.children[0].src)
    let currentIndex = images.indexOf(currentElement);

    leftBtn.addEventListener('click', (e) => {
        currentIndex--;
        modalImageElement.src = images[currentIndex].children[0].src;
        controls(currentIndex, images.length, leftBtn, rightBtn);
    });

    rightBtn.addEventListener('click', (e) => {
        currentIndex++;
        modalImageElement.src = images[currentIndex].children[0].src;
        controls(currentIndex, images.length, leftBtn, rightBtn);
    });
    controls(currentIndex, images.length, leftBtn, rightBtn);
    console.log(currentElement.childNodes)
    modalImageElement.src = event.currentTarget.children[0].src;
    modalImageElement.addEventListener('click', zoomInZoomOut)
    modalContainer.style.display = 'flex';
    bodyElement.style.overflow = 'hidden';
}

imagesContainerElements.forEach(element => {
    element.addEventListener('click', modalImages);
});
navigationBtnElements.forEach(btnElement => {
    btnElement.addEventListener('click', (event) => {

        if (Array.from(navBtnElement).filter(e => e.style.display === 'flex').length > 0) {
            collapseMenu.forEach(e => e.style.display = 'none');
        }
    });
});

navBtnElement.forEach(element => {
    element.addEventListener('click', (event) => {
        const hideMenu = () => {
            collapseMenu.forEach(e => e.style.display = 'none');
            collapseMenu.forEach(e => e.removeEventListener('click', hideMenu));
        };
        if (Array.from(collapseMenu).filter(e => e.style.display !== 'flex').length > 0) {
            collapseMenu.forEach(e => e.style.display = 'flex');
            collapseMenu.forEach(e => e.addEventListener('click', hideMenu));
        } else {
            hideMenu();
        }
    });
});

window.addEventListener('scroll', (event) => {
    if (event.currentTarget.scrollY >= 45) {
        btnBackToTop.style.display = 'flex';
        btnBackToTop.addEventListener('click', (ev) => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        })
    } else {
        btnBackToTop.style.display = 'none';
    }
});

languageBtnElements.forEach(languageBtn => {
    languageBtn.addEventListener('click', (event) => {
        if (!languageBtn.className.includes('selected')) {
            const titleMap = {
                'en': 'M - A SERVICE Ltd.',
                'bg': 'ЕМ-АЙ СЕРВИЗ ООД',
            };
            document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            const selectedLanguage = languageBtn.textContent.toLowerCase();

            languageImageElement.forEach(e => e.src = `static/images/${selectedLanguage}.png`);
            document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
            languageBtnElements.forEach(e => e.textContent.toLowerCase() === selectedLanguage ? e.classList.add('selected') : 1);

            document.querySelector('title').textContent = titleMap[selectedLanguage];
            document.getElementById(selectedLanguage).classList.add('active');
        }
    })
});

function sendEmail(event) {
    event.preventDefault();
    const parentElement = event.currentTarget.closest('form');
    const [name, email, description, message] = parentElement.querySelectorAll('.input-field')

    const emailString = `mailto:m-aservice@mail.bg?subject=${name.value}:${description.value}&body=${message.value}`
    window.open(emailString);
}

(function ($) {
    "use strict";

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: false,
        page: true,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });


})(jQuery);


// const wrapperContainers = document.querySelectorAll('.images-wrapper');
//
// wrapperContainers.forEach(wrapper => {
//     const images = Array.from(wrapper.querySelectorAll('.image-container'));
//
//     setInterval((event) => {
//         images.forEach(imgContainer => imgContainer.style.display = 'none');
//
//         const currentImage = images.shift();
//         currentImage.style.display = 'flex';
//         images.push(currentImage);
//     }, 3000);
// });
