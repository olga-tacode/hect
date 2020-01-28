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
        displayingFooter(w);
    },
    false
);

function displayingFooter(w) {
    if (homeSection.classList.contains('active')) {
        header.style.background = 'transparent';
        footer.style.display = 'none';
        if (w <= 1024) {
            logoFilling.setAttribute('fill', '');
            logoStroke.setAttribute('stroke', '');
            changeIconPathColorOthers(iconPathOne, iconPathTwo);
        } else {
            logoFilling.setAttribute('fill', '#ffffff');
            logoStroke.setAttribute('stroke', '#ffffff');
            changeIconPathColorHome(iconPathOne, iconPathTwo);
        }
    } else {
        header.style.background = '#ffffff';
        footer.style.display = 'grid';
        logoFilling.setAttribute('fill', '#000000');
        logoStroke.setAttribute('stroke', '#000000');
        changeIconPathColorOthers(iconPathOne, iconPathTwo);
    }
}

displayingFooter();

function changeIconPathColorHome(arrOne, arrTwo) {
    arrOne.forEach(element => {
        element.setAttribute('fill', '#ffffff');
    });
    arrTwo.forEach(element => {
        element.setAttribute('fill', '#000000');
    });
};

function changeIconPathColorOthers(arrOne, arrTwo) {
    arrOne.forEach(element => {
        element.setAttribute('fill', '#000000');
    });
    arrTwo.forEach(element => {
        element.setAttribute('fill', '#ffffff');
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
            displayingFooter();
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
});