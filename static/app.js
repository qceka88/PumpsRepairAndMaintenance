const navBtnElement = document.querySelector('#navBtn');
const collapseMenu = document.querySelector('.navigation-links');
const sectionsElements = document.querySelectorAll('section');
const navigationBtnElements = document.querySelectorAll('.section-link');

navigationBtnElements.forEach(btnElement => {
    btnElement.addEventListener('click', (event) => {
        sectionsElements.forEach(sec => sec.classList.remove('active'));

        const elementID = btnElement.textContent.toLowerCase();
        document.getElementById(elementID).classList.add('active');
    })

})

navBtnElement.addEventListener('click', (event) => {
    const hideMenu = () => {
        collapseMenu.style.display = 'none';
        collapseMenu.removeEventListener('click', hideMenu);
    };
    if (collapseMenu.style.display !== 'flex') {
        collapseMenu.style.display = 'flex';
        collapseMenu.addEventListener('click', hideMenu)
    } else {
        hideMenu();
    }


});

window.addEventListener('scroll', (event) => {
    const navBar = document.querySelector('header');
    if (Number(window.scrollY) >= 45) {
        if (collapseMenu.style.display !== 'none') {
            collapseMenu.style.display = 'none';
        }
        navBar.style.position = 'fixed';
        navBar.classList.add('sticky-top-nav');
    } else {
        navBar.style.position = 'relative';
        navBar.classList.remove('sticky-top-nav');
    }
});