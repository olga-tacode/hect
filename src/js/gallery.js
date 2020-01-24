const gallery = document.getElementById("gallery");
const photoCategoriesLinks = document.querySelectorAll(".portfolio-categories");

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
  loopingFilteredArr(filteredArr);
};

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
  gallery.insertAdjacentHTML("beforeend", dataToHTML);
  /* openPhoto(); */
};

/* const openPhoto = () => {
    const imagesContainer = document.querySelectorAll('.container');
    const closePhotoBttn = document.getElementById('close-photo-bttn');
    imagesContainer.forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            element.classList.add('container-active');
            event.target.classList.add('img-active');
            closePhotoBttn.classList.add('active');
            console.log(element)
            closeModal(element, event.target, closePhotoBttn);
        })
    });
} */

const coloringLinksCategories = (arr, link) => {
  arr.forEach(element => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  link.classList.add("active");
};

photoCategoriesLinks.forEach(category => {
  category.addEventListener("click", event => {
    event.preventDefault();
    obtainingJsonData(event.target.id);
    coloringLinksCategories(photoCategoriesLinks, event.target);
  });
});

window.onload = () => {
  obtainingJsonData("fashion");
};
