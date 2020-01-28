/* ----------------- General elements ---------------------- */

const sectionLinksObj = document.querySelectorAll('.section-links');
const appPages = document.querySelectorAll('.pages');

/* ----------------- Menu elements ---------------------- */

const header = document.querySelector('header');
const openMenuIcon = document.getElementById('open-menu-icon');
const closeMenuIcon = document.getElementById('close-menu-icon');
const hamburgerIconSvgPath1 = document.getElementById('hamburger-svg-path-1');
const hamburgerIconSvgPath2 = document.getElementById('hamburger-svg-path-2');
const menu = document.getElementById('menu');
const logoFilling = document.getElementById('logo-filling');
const logoStroke = document.getElementById('logo-stroke');
const iconPathOne = document.querySelectorAll('.icon-path-one');
const iconPathTwo = document.querySelectorAll('.icon-path-two');
const sectionLinksContainer = document.querySelectorAll('.section-links-container a');
const logo = document.getElementById('logo');

/* ----------------- Home elements ---------------------- */

const homeSection = document.getElementById('home');
const scrollBttn = document.getElementById('scroll-bttn');

/* ----------------- Footer elements ---------------------- */

const footer = document.querySelector('footer');

/* ----------------- Functions ---------------------- */

function hamburgerIconColor() {
    let iconDisplayStyle = window.getComputedStyle(homeSection, null).getPropertyValue("display");
    if (iconDisplayStyle === 'grid') {
        hamburgerIconSvgPath1.setAttribute('stroke', '#FEFEFE');
        hamburgerIconSvgPath2.setAttribute('fill', '#FFFFFF');
    } else if (iconDisplayStyle === 'none') {
        hamburgerIconSvgPath1.setAttribute('stroke', '#272424');
        hamburgerIconSvgPath2.setAttribute('fill', '#000000');
    }
}
hamburgerIconColor();

let w =
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    window.innerWidth;

window.addEventListener(
    "resize",
    () => {
        w =
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            window.innerWidth;
        listeningScreenWidth(w);
    },
    false
);

function listeningScreenWidth(w) {
    if (w <= 1024) {
        if (homeSection.classList.contains('active')) {
            isHomeActiveMobile();
        } else {
            isntHomeActive();
        }
    } else {
        if (homeSection.classList.contains('active')) {
            isHomeActiveDesktop();
        } else {
            isntHomeActive();
        }
    }
};

listeningScreenWidth(w);

function isHomeActiveMobile() {
    header.style.background = 'transparent';
    footer.style.display = 'none';
    logoFilling.setAttribute('fill', '');
    logoStroke.setAttribute('stroke', '');
    changeIconPathColor(iconPathOne, '#000000');
    changeIconPathColor(iconPathTwo, '#ffffff');
    changeMenuLinksColor('#000000', sectionLinksContainer);
};

function isHomeActiveDesktop() {
    header.style.background = 'transparent';
    footer.style.display = 'none';
    logoFilling.setAttribute('fill', '#ffffff');
    logoStroke.setAttribute('stroke', '#ffffff');
    changeIconPathColor(iconPathOne, '#ffffff');
    changeIconPathColor(iconPathTwo, '#000000');
    changeMenuLinksColor('#ffffff', sectionLinksContainer);
};

function isntHomeActive() {
    header.style.background = '#ffffff';
    footer.style.display = 'grid';
    logoFilling.setAttribute('fill', '#000000');
    logoStroke.setAttribute('stroke', '#000000');
    changeIconPathColor(iconPathOne, '#000000');
    changeIconPathColor(iconPathTwo, '#ffffff');
    changeMenuLinksColor('#000000', sectionLinksContainer);
};

function changeIconPathColor(arr, color) {
    arr.forEach(element => {
        element.setAttribute('fill', `${color}`);
    });
};

function changeMenuLinksColor(color, arr) {
    arr.forEach(element => {
        element.style.color = `${color}`;
    });
};

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
            listeningScreenWidth(w);
            if (event.target.classList.contains(page.id)) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        })
    })
});

scrollBttn.addEventListener('click', (event) => {
    event.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    homeSection.classList.remove('active');
    portfolioSection.classList.add('active');
    hamburgerIconColor();
    listeningScreenWidth(w);
});

logo.addEventListener('click', (event) => {
    event.preventDefault();
    appPages.forEach(page => {
        if (page.id === 'home') {
            page.classList.add('active');
            hamburgerIconColor();
            listeningScreenWidth(w);
        } else {
            page.classList.remove('active');
        }
    });
});