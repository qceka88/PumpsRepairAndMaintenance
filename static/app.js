const navBtnElement = document.querySelectorAll('#navBtn, #navBtnBg');
const collapseMenu = document.querySelectorAll('.navigation-links');
const navigationBtnElements = document.querySelectorAll('.section-link');
const btnBackToTop = document.querySelector('.back-to-top');
const languageBtnElements = document.querySelectorAll('.language-link');
const languageImageElement = document.querySelectorAll('.flag-img img');

const modalContainer = document.querySelector('.modal-container');
const modalImageElement = document.querySelector('.modal-image')
const bodyElement = document.querySelector('body');
const closeModalButton = document.querySelector('.close-modal');
const brandsBanner = document.querySelectorAll('.top-banner-brands .brands-container');


closeModalButton.addEventListener('click', (e) => {
    modalContainer.style.display = 'none';
    bodyElement.style.overflow = 'auto';
    modalImageElement.removeEventListener('click', zoomInZoomOut)
    modalImageElement.removeEventListener('click', closeModalWindow);
});

function closeModalWindow(event) {
    const forbiddenArea = Array.from(document.querySelectorAll('.modal-wrapper *'));
    if (!forbiddenArea.includes(event.target)) {
        closeModalButton.click();
    }
}

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

    function moveLeft(e) {
        currentIndex--;
        modalImageElement.src = images[currentIndex].children[0].src;
        controls(currentIndex, images.length, leftBtn, rightBtn);
    }

    function moveRight(e) {
        currentIndex++;
        modalImageElement.src = images[currentIndex].children[0].src;
        controls(currentIndex, images.length, leftBtn, rightBtn);
    }


    leftBtn.addEventListener('click', moveLeft);
    rightBtn.addEventListener('click', moveRight);


    controls(currentIndex, images.length, leftBtn, rightBtn);

    modalImageElement.src = event.currentTarget.children[0].src;
    modalImageElement.addEventListener('click', zoomInZoomOut);

    if (window.screen.width <= 850) {
        modalImageElement.addEventListener('touchstart', (event) => {
            const forbiddenArea = Array.from(document.querySelectorAll('.control-button'));
            if (!forbiddenArea.includes(event.target)) {
                let startTouchX = event.touches[0].clientX;

                function handleTouchMove(e) {
                    let currentTouchX = e.touches[0].clientX;
                    let swipeDistance = currentTouchX - startTouchX;

                    const threshold = 100;

                    if (swipeDistance >= threshold) {
                        leftBtn.click();
                        startTouchX = currentTouchX;
                    } else if (swipeDistance <= -threshold) {
                        rightBtn.click();
                        startTouchX = currentTouchX;
                    }
                }

                modalImageElement.addEventListener('touchmove', handleTouchMove);

                modalImageElement.addEventListener('touchend', () => {

                    modalImageElement.removeEventListener('touchmove', handleTouchMove);
                });
            }
        });
    }


    modalContainer.style.display = 'flex';
    bodyElement.style.overflow = 'hidden';
    modalContainer.addEventListener('click', closeModalWindow);
}


navigationBtnElements.forEach(btnElement => {
    btnElement.addEventListener('click', (event) => {

        if (Array.from(navBtnElement).filter(e => e.style.display === 'flex').length > 0) {
            collapseMenu.forEach(e => e.style.display = 'none');
        }
    });
});

navBtnElement.forEach(element => {
    element.addEventListener('click', (event) => {
        const hideMenu = (e) => {
            collapseMenu.forEach(e => e.style.display = 'none');
            collapseMenu.forEach(e => e.removeEventListener('click', hideMenu));
        };
        if (Array.from(collapseMenu).filter(e => e.style.display !== 'flex').length > 0) {
            collapseMenu.forEach(e => e.style.display = 'flex');
            collapseMenu.forEach(e => e.addEventListener('click', hideMenu));
            window.addEventListener('click', (e) => {
                const area = Array.from(document.querySelectorAll('.section-link, .navbar-button-toggler, span.fa.fa-bars'));
                console.log(area)
                console.log(e.target)
                console.log(!area.includes(e.target))
                if (!area.includes(e.target)) {
                    hideMenu();
                }
            })
        } else {
            hideMenu(event);
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
                items: 3
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);


setInterval(() => {
    brandsBanner.forEach(row => {
        const element = row.removeChild(row.firstElementChild);
        row.appendChild(element);
    })


}, 1800, "smooth");