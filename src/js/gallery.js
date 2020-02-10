const gallery = document.getElementById("gallery");
const photoCategoriesLinks = document.querySelectorAll(".portfolio-categories");
const modal = document.querySelector(".modal");
const carousel = document.querySelector(".carousel");
const closeModalBttn = document.getElementById("close-modal");
const portfolioLink = document.getElementById("portfolio-link");
const socialListone = document.getElementById("social-list");
const scrollButton = document.getElementById("scroll-bttn");
const fashionLink = document.getElementById("fashion");
let slideIndex;
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const counter = document.getElementById("counter");

function obtainingJsonData(id) {
  fetch("./src/photos.json")
    .then(response => {
      return response.json();
    })
    .then(photosCollection => {
      filterElements(photosCollection, id);
    });
}

const filterElements = (photos, id) => {
  let filteredArr = photos.filter(photo => photo.category === id);
  if (id != "branding") {
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
  openPhoto(arr);
};

const paintPhotos = photo => {
  let dataToHTML = `
    <div class="container ${photo.class} ${photo.category}" id="${photo.num}">
        <img class="item" src="${photo.url}"/>
    </div>`;
  gallery.insertAdjacentHTML("beforeend", dataToHTML);
};

const openPhoto = photosArr => {
  let arr = document.querySelectorAll(".container");
  arr.forEach(element => {
    element.addEventListener("click", event => {
      event.preventDefault();
      paintBrandingPhotos(photosArr, parseInt(element.id));
    });
  });
};

/* --------------------------- For branding section -------------------------------- */

const handleBranding = arr => {
  gallery.innerHTML = "";
  const brandingCategories = `
    <div class="widest branding blueB" id="publicaciones">Publications</div>
    <div class="taller branding blackB" id="cocacola">Coca-Cola</div>
    <div class="small branding blueB" id="capufe">CAPUFE</div>
    <div class="small branding blueB" id="kellogs">Kellogg's</div>
    `;
  gallery.insertAdjacentHTML("beforeend", brandingCategories);
  const brandingCategoriesArr = document.querySelectorAll(".branding");
  handlingCategoriesOnClick(brandingCategoriesArr, arr);
};

const handlingCategoriesOnClick = (categoriesCollection, photosCollection) => {
  categoriesCollection.forEach(category => {
    category.addEventListener("click", event => {
      event.preventDefault();
      filteringBrandinPhotos(category.id, photosCollection);
    });
  });
};

const filteringBrandinPhotos = (id, photos) => {
  let filteredArr = photos.filter(photo => photo.subcategory === id);
  paintBrandingPhotos(filteredArr, 0);
};

/* --------------------------- Modal of branding section + carousel -------------------------------- */

const paintBrandingPhotos = (arr, id) => {
  modal.classList.add("active");
  let imgArray = arr.map(img => {
    return `<img class="mySlides" id="${img.num}" src="${img.url}" style="width:100%; height: 100%; display:none; object-fit: contain;"/>`;
  });
  loopingImages(imgArray, id);
  closeModal();
};

const closeModal = () => {
  closeModalBttn.addEventListener("click", () => {
    modal.classList.remove("active");
    carousel.innerHTML = "";
    slideIndex = "";
  });
};

let slides;
let slideLen;

function loopingImages(arr, id) {
  arr.forEach(element => {
    carousel.insertAdjacentHTML("beforeend", element);
  });
  slides = document.querySelectorAll(".mySlides");
  showSlides(id);
}

function showSlides(id) {
  slideLen = slides.length - 1;
  slideIndex = id;
  checkingSlideIndex(slideIndex, slideLen, slides);
}

prev.addEventListener("click", event => {
  event.preventDefault();
  checkingSlideIndex((slideIndex += -1), slideLen, slides);
});
next.addEventListener("click", event => {
  event.preventDefault();
  checkingSlideIndex((slideIndex += 1), slideLen, slides);
});

function checkingSlideIndex(n, len, arr) {
  let forCheckingIndex = n;
  if (n > len) {
    forCheckingIndex = 0;
    slideIndex = 0;
    paintSlide(forCheckingIndex, arr);
  } else if (n < 0) {
    forCheckingIndex = len;
    slideIndex = len;
    paintSlide(forCheckingIndex, arr);
  } else {
    paintSlide(forCheckingIndex, arr);
  }
  counter.innerHTML = `${slideIndex + 1}/${slideLen + 1}`;
}

function paintSlide(slideIndex, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (i === slideIndex) {
      arr[slideIndex].style.display = "block";
    } else {
      arr[i].style.display = "none";
    }
  }
}

/* --------------------------- Function that changes link color when is activated -------------------------------- */

const coloringLinksCategories = (arr, link) => {
  arr.forEach(element => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  link.classList.add("active");
};

/* --------------------------- Function that triggers the fetch function -------------------------------- */

photoCategoriesLinks.forEach(category => {
  category.addEventListener("click", event => {
    event.preventDefault();
    obtainingJsonData(event.target.id);
    coloringLinksCategories(photoCategoriesLinks, event.target);
  });
});

portfolioLink.addEventListener("click", () => {
  obtainingJsonData("fashion");
  coloringLinksCategories(photoCategoriesLinks, fashionLink);
  socialListone.classList.remove("hide");
});

scrollButton.addEventListener("click", () => {
  obtainingJsonData("fashion");
});
