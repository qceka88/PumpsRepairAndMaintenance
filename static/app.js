const navBtnElement = document.querySelectorAll('#navBtn, #navBtnBg');
const collapseMenu = document.querySelectorAll('.navigation-links');
const navigationBtnElements = document.querySelectorAll('.section-link');
const btnBackToTop = document.querySelector('.back-to-top');
const languageBtnElements = document.querySelectorAll('.language-link');
const languageImageElement = document.querySelectorAll('.flag-img img');
navigationBtnElements.forEach(btnElement => {
    btnElement.addEventListener('click', (event) => {

        if (Array.from(navBtnElement).filter(e => e.style.display === 'flex').length > 0) {
            collapseMenu.forEach(e => e.style.display = 'none');
        }
    });
});

navBtnElement.forEach(e => {
    e.addEventListener('click', (event) => {
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
                'en': 'Hydrophore - Martin Rusev',
                'bg': 'Хидрофори - Мартин Русев'
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