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
const homeLink = document.getElementById('menu-home-link');
const socialMediaHeader = document.querySelectorAll('.social-media-header');
const portfolioSection = document.getElementById('portfolio');
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
        homeLink.style.display = 'block';
        if (homeSection.classList.contains('active')) {
            isHomeActiveMobile();
        } else {
            isntHomeActive();
        }
    } else {
        homeLink.style.display = 'none';
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
    changeMenuLinksColor('black', sectionLinksContainer);
};

function isHomeActiveDesktop() {
    header.style.background = 'transparent';
    footer.style.display = 'none';
    logoFilling.setAttribute('fill', '#ffffff');
    logoStroke.setAttribute('stroke', '#ffffff');
    changeIconPathColor(iconPathOne, '#ffffff');
    changeIconPathColor(iconPathTwo, '#000000');
    changeMenuLinksColor('white', sectionLinksContainer);
};

function isntHomeActive() {
    header.style.background = '#ffffff';
    footer.style.display = 'grid';
    logoFilling.setAttribute('fill', '#000000');
    logoStroke.setAttribute('stroke', '#000000');
    changeIconPathColor(iconPathOne, '#000000');
    changeIconPathColor(iconPathTwo, '#ffffff');
    changeMenuLinksColor('black', sectionLinksContainer);
};

function changeIconPathColor(arr, color) {
    arr.forEach(element => {
        element.setAttribute('fill', `${color}`);
    });
};

function changeMenuLinksColor(color, arr) {
    arr.forEach(element => {
        if (element.classList.contains('white') && color != 'white') {
            element.classList.remove('white');
            element.classList.add(`${color}`);
        } else if (element.classList.contains('black') && color != 'black') {
            element.classList.remove('black');
            element.classList.add(`${color}`);
        } else {
            element.classList.add(`${color}`);
        }
    });
};

function removeSocialMedia(arr, style) {
    arr.forEach(element => {
        element.style.display = `${style}`;
    })
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
                window.scrollTo(0, 0);
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