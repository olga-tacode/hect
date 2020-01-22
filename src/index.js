const openMenuIcon = document.getElementById('open-menu-icon');
const hamburgerIconSvgPath1 = document.getElementById('hamburger-svg-path-1');
const hamburgerIconSvgPath2 = document.getElementById('hamburger-svg-path-2');
const menu = document.getElementById('menu');

openMenuIcon.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.add('active');
});

const homeSection = document.getElementById('home');
const homeLink = document.getElementById('home-link');

function hamburgerIconColor () {
    if(homeSection.classList.contains('active')){
       hamburgerIconSvgPath1.setAttribute('stroke', '#FEFEFE');
       hamburgerIconSvgPath2.setAttribute('fill', '#FFFFFF') 
    }
}

hamburgerIconColor();