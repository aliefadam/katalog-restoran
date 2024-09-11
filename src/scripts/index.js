import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";

const menuContainer = document.getElementById("menu-container");
const overlay = document.getElementById("overlay-detail-restaurant");
const detailRestoran = document.getElementById("detail-restaurant");

document.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btn-lihat-detail")) {
    openShowDetail(target.getAttribute("data-restaurant-id"));
  }

  if (
    target.classList.contains("btn-close-detail") ||
    target.id == "overlay-detail-restaurant" ||
    target.classList.contains("btn-close-icon")
  ) {
    closeShowDetail();
  }
});

const getData = async () => {
  const res = await fetch("/data/DATA.json");
  const data = await res.json();
  return data.restaurants;
};

const show = () => {
  fetch("/data/DATA.json")
    .then((res) => res.json())
    .then((res) => {
      const restaurants = res.restaurants;
      let HTML = "";
      restaurants.forEach((restaurant, i) => {
        HTML += `
        <div class="menu-item" data-restauran-id="${restaurant.id}">
          <div class="menu-image">
            <img
              src="${restaurant.pictureId}"
              alt="Gambar Restoran ${restaurant.name}"
            />
            <div class="label-city poppins-medium"><i class="fa-sharp fa-solid fa-location-dot"></i>${
              restaurant.city
            }</div>
          </div>
          <div class="menu-detail">
            <p>Rating ${restaurant.rating} <i class="fa-solid fa-star"></i></p>
            <h3>${restaurant.name}</h3>
            <p class="poppins-light desc">${restaurant.description
              .toString()
              .substring(0, 100)}...</p>
            <button class="btn-lihat-detail" data-restaurant-id="${
              restaurant.id
            }">Lihat Detail</button>
          </div>
        </div>
        `;
      });
      menuContainer.innerHTML = HTML;
    });
};

const openShowDetail = async (id) => {
  const restaurants = await getData();

  const { name, description, pictureId, city, rating } = restaurants.find(
    (r) => r.id == id
  );

  document.getElementById("gambar-detail").src = pictureId;
  document.getElementById("name-detail").innerText = `${name} - ${city}`;
  document.getElementById(
    "rating-detail"
  ).innerHTML = `Rating ${rating} <i class="fa-solid fa-star"></i>`;
  document.getElementById("desc-detail").innerText = description;

  overlay.style.animation = "fadeInDown 500ms";
  overlay.style.display = "flex";
};

const closeShowDetail = (e) => {
  detailRestoran.style.animation = "fadeOutUp 500ms alternate";
  setTimeout(() => {
    overlay.style.display = "none";
    detailRestoran.style.animation = "fadeInDown 500ms";
  }, 200);
};

show();
