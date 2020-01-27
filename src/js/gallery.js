const gallery = document.getElementById('gallery');
const photoCategoriesLinks = document.querySelectorAll('.portfolio-categories');
const modal = document.querySelector('.modal');
const carousel = document.querySelector('.carousel');
const closeModalBttn = document.getElementById('close-modal');
let slideIndex = 1;
const changingBttns = document.querySelectorAll('.changing-bttns');
const portfolioLink = document.getElementById('portfolio-link');
const scrollButton = document.getElementById('scroll-bttn');

function obtainingJsonData(id) {
    fetch('./src/photos.json')
        .then(response => {
            return response.json();
        })
        .then(photosCollection => {
            filterElements(photosCollection, id);
        });
};

const filterElements = (photos, id) => {
    let filteredArr = photos.filter(photo => photo.category === id);
    if (id != 'branding') {
        loopingFilteredArr(filteredArr);
    } else {
        handleBranding(filteredArr);
    }
};

/* --------------------------- For every category, except branding -------------------------------- */

const loopingFilteredArr = arr => {
    gallery.innerHTML = "";
    arr.forEach(element => {
        paintPhotos(element);
    });
};

const paintPhotos = photo => {
    let dataToHTML = `
    <div class="container ${photo.class}">
        <button id="close-photo-bttn">X</button>
        <img class="item" src="${photo.url}"/>
    </div>`;
    gallery.insertAdjacentHTML('beforeend', dataToHTML);
    /* openPhoto(); */
};

/* --------------------------- For branding section -------------------------------- */

const handleBranding = arr => {
    gallery.innerHTML = '';
    const brandingCategories = `
    <div class="widest branding blueB" id="publicaciones">Publicaciones</div>
    <div class="taller branding blackB" id="cocacola">Coca-Cola</div>
    <div class="small branding blueB" id="capufe">CAPUFE</div>
    <div class="small branding blueB" id="kellogs">Kellog's</div>
    `
    gallery.insertAdjacentHTML('beforeend', brandingCategories);
    const brandingCategoriesArr = document.querySelectorAll('.branding');
    handlingCategoriesOnClick(brandingCategoriesArr, arr);
};

const handlingCategoriesOnClick = (categoriesCollection, photosCollection) => {
    categoriesCollection.forEach(category => {
        category.addEventListener('click', event => {
            event.preventDefault();
            filteringBrandinPhotos(category.id, photosCollection);
        });
    });
};

const filteringBrandinPhotos = (id, photos) => {
    let filteredArr = photos.filter(photo => photo.subcategory === id);
    paintBrandingPhotos(filteredArr);
};

/* --------------------------- Modal of branding section + carousel -------------------------------- */

const paintBrandingPhotos = arr => {
    modal.classList.add('active');
    arr.forEach(element => {
        let dataToCarousel = `
        <img class = "mySlides" src="${element.url}" style="width:100%; object-fit: cover;"/>`
        carousel.insertAdjacentHTML('beforeend', dataToCarousel);
    });
    showDivs(slideIndex);
    changeImg();
    closeModal();
};

const closeModal = () => {
    closeModalBttn.addEventListener('click', () => {
        modal.classList.remove('active');
        carousel.innerHTML = '';
    })
};

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    let i;
    const x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

const changeImg = () => {
    changingBttns.forEach(bttn => {
        bttn.addEventListener('click', (event) => {
            if (event.target.id === 'prev') {
                plusDivs(-1);
            } else {
                plusDivs(1);
            }
        })
    })
};

/* --------------------------- Function that changes link color when is activated -------------------------------- */

const coloringLinksCategories = (arr, link) => {
    arr.forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
    });
    link.classList.add('active');
};

/* --------------------------- Function that triggers the fetch function -------------------------------- */

photoCategoriesLinks.forEach(category => {
    category.addEventListener('click', event => {
        event.preventDefault();
        obtainingJsonData(event.target.id);
        coloringLinksCategories(photoCategoriesLinks, event.target);
    });
});

portfolioLink.addEventListener('click', ()=>{
    obtainingJsonData('fashion');
});

scrollButton.addEventListener('click', ()=>{
    obtainingJsonData('fashion');
});
