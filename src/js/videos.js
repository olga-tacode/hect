const filmGallery = document.getElementById("film-gallery");
const filmCategoriesLinks = document.querySelectorAll(".film-categories");

function obtainDataJson(id) {
  fetch("./src/videos.json")
    .then(response => {
      return response.json();
    })
    .then(filmCollection => {
      filterFilms(filmCollection, id);
    });
}

const filterFilms = (films, id) => {
  const filmResult = films.filter(videos => videos.category === id);
  renderFilterFilms(filmResult);
};

const renderFilterFilms = obj => {
  filmGallery.innerHTML = "";
  obj.forEach(element => {
    paintVideos(element);
  });
};

const paintVideos = videos => {
  let paintHTML = `
    <div class="video-container">
    <video width="100%" height="100%" controls poster="${videos.poster}">
    <source src="${videos.url}"
    type="video/mp4" /></video>
    </div>`;
  filmGallery.insertAdjacentHTML("beforeend", paintHTML);
};

const coloringVideoCategories = (arr, link) => {
  arr.forEach(element => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  link.classList.add("active");
};

filmCategoriesLinks.forEach(category => {
  category.addEventListener("click", event => {
    event.preventDefault();
    obtainDataJson(event.target.id);
    coloringVideoCategories(filmCategoriesLinks, event.target);
  });
});

const openData = () => {
  obtainDataJson("ad");
};

document.getElementById("film-link").addEventListener("click", openData);
