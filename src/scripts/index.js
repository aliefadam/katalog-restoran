import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";

const menuContainer = document.getElementById("menu-container");
document.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btn-lihat-detail")) {
    // alert("asd");
  }
});

const show = () => {
  fetch("/data/DATA.json")
    .then((res) => res.json())
    .then((res) => {
      const restaurants = res.restaurants;
      let HTML = "";
      restaurants.forEach((restaurant, i) => {
        HTML += `
        <div class="menu-item" restauran-id="${restaurant.id}">
          <div class="menu-image">
            <img
              src="${restaurant.pictureId}"
              alt="Gambar Restoran ${restaurant.name}"
            />
            <div class="label-city poppins-medium">${restaurant.city}</div>
          </div>
          <div class="menu-detail">
            <p>Rating ${restaurant.rating} <i class="fa-solid fa-star"></i></p>
            <h3>${restaurant.name}</h3>
            <p class="poppins-light desc">${restaurant.description
              .toString()
              .substring(0, 100)}...</p>
            <button class="btn-lihat-detail">Lihat Detail</button>
          </div>
        </div>
        `;
      });
      menuContainer.innerHTML = HTML;
    });
};

show();
