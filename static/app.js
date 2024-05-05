const navBtnElement = document.querySelector('#navBtn');
const collapseMenu = document.querySelector('.navigation-links');
const navigationBtnElements = document.querySelectorAll('.section-link');
const btnBackToTop = document.querySelector('.back-to-top');
navigationBtnElements.forEach(btnElement => {
    btnElement.addEventListener('click', (event) => {

        if (navBtnElement.style.display === 'flex') {
            collapseMenu.style.display = 'none';
        }
    })
});

navBtnElement.addEventListener('click', (event) => {
    const hideMenu = () => {
        collapseMenu.style.display = 'none';
        collapseMenu.removeEventListener('click', hideMenu);
    };
    if (collapseMenu.style.display !== 'flex') {
        collapseMenu.style.display = 'flex';
        collapseMenu.addEventListener('click', hideMenu);
    } else {
        hideMenu();
    }
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