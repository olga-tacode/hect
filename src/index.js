/* ----------------- General elements ---------------------- */

const sectionLinksObj = document.querySelectorAll('.section-links');
const appPages = document.querySelectorAll('.pages');

/* ----------------- Menu elements ---------------------- */

const openMenuIcon = document.getElementById('open-menu-icon');
const closeMenuIcon = document.getElementById('close-menu-icon');
const hamburgerIconSvgPath1 = document.getElementById('hamburger-svg-path-1');
const hamburgerIconSvgPath2 = document.getElementById('hamburger-svg-path-2');
const menu = document.getElementById('menu');

/* ----------------- Home elements ---------------------- */

const homeSection = document.getElementById('home');

/* ----------------- Functions ---------------------- */

function hamburgerIconColor() {
  let iconDisplayStyle = window.getComputedStyle(homeSection, null).getPropertyValue("display");
    if (iconDisplayStyle === 'grid') {
        hamburgerIconSvgPath1.setAttribute('stroke', '#FEFEFE');
        hamburgerIconSvgPath2.setAttribute('fill', '#FFFFFF');
    } else if(iconDisplayStyle === 'none') {
        hamburgerIconSvgPath1.setAttribute('stroke', '#272424');
        hamburgerIconSvgPath2.setAttribute('fill', '#000000');
    }
}
hamburgerIconColor();

/* ----------------- DOM events ---------------------- */

openMenuIcon.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.add('active');
});

closeMenuIcon.addEventListener('click', () => {
    event.preventDefault();
    menu.classList.remove('active');
});

sectionLinksObj.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        menu.classList.remove('active');
        appPages.forEach(page => {
            hamburgerIconColor();
            if (event.target.classList.contains(page.id)) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        })
    })
})