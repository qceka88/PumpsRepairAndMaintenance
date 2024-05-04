const navBtnElement = document.querySelector('#navBtn');
const collapseMenu = document.querySelector('.navigation-links');
const sectionsElements = document.querySelectorAll('section');
const navigationBtnElements = document.querySelectorAll('.section-link');

navigationBtnElements.forEach(btnElement => {
    btnElement.addEventListener('click', (event) => {
        sectionsElements.forEach(sec => sec.classList.remove('active'));
        const elementID = btnElement.textContent.toLowerCase();
        document.getElementById(elementID).classList.add('active');
        if (navBtnElement.style.display === 'flex') {
            collapseMenu.style.display = 'none';
        }
    })
})

navBtnElement.addEventListener('click', (event) => {
    const hideMenu = (e) => {
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
