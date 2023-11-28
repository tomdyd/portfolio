/******************************************
 *  Author : Author
 *  Created On : Sun Nov 19 2023
 *  File : site.js
 *******************************************/

let input;
let button;
let cityName;
let warning;
let photo;
let weather;
let temperature;
let humidity;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  getWheater();
};

const prepareDOMElements = () => {
  input = document.querySelector("input");
  button = document.querySelector("button");
  cityName = document.querySelector(".city-name");
  warning = document.querySelector(".warning");
  photo = document.querySelector(".photo");
  weather = document.querySelector(".weather");
  temperature = document.querySelector(".temperature");
  humidity = document.querySelector(".humidity");
};

const prepareDOMEvents = () => {
  button.addEventListener("click", getWheater);
  input.addEventListener("keyup", checkEnterEvent);
};

const GEO_API_LINK = "https://api.openweathermap.org/geo/1.0/direct?q=";
const API_KEY = "&appid=2a52e2a47a9c802ce3a28eeff3a592dd";

const getWheater = () => {
  const city = input.value || "Słupsk";
  const GeoCodeURL = GEO_API_LINK + city + API_KEY;
  let URL;

  axios
    .get(GeoCodeURL)
    .then((res) => {
      const lat = "lat=" + res.data[0].lat;
      const lon = "&lon=" + res.data[0].lon;
      const API_LINK = "https://api.openweathermap.org/data/2.5/weather?";
      const API_UNITS = "&units=metric";
      cityName.textContent = res.data[0].name;

      URL = API_LINK + lat + lon + API_KEY + API_UNITS;

      axios.get(URL).then((res) => {
        console.log(res);
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const status = Object.assign({}, ...res.data.weather);

        humidity.textContent = hum + "%";
        temperature.textContent = Math.round(temp) + "°C";
        weather.textContent = status.main;

        warning.textContent = "";
        input.value = "";

        if (status.id >= 200 && status.id < 300) {
          photo.setAttribute("src", "/img/thunderstorm.png");
        } else if (status.id >= 300 && status.id < 400) {
          photo.setAttribute("src", "/img/drizzle.png");
        } else if (status.id >= 500 && status.id < 600) {
          photo.setAttribute("src", "/img/rain.png");
        } else if (status.id >= 600 && status.id < 700) {
          photo.setAttribute("src", "/img/ice.png");
        } else if (status.id >= 701 && status.id < 800) {
          photo.setAttribute("src", "/img/fog.png");
        } else if (status.id === 800) {
          photo.setAttribute("src", "/img/sun.png");
        } else if (status.id >= 801 && status.id < 900) {
          photo.setAttribute("src", "/img/cloud.png");
        } else {
          photo.setAttribute("src", "img/unknow.png");
        }
      });
    })
    .catch(() => (warning.textContent = "Wpisz poprawną nazwę miasta!"));
};

const checkEnterEvent = (e) => {
  if (e.key === "Enter") {
    getWheater();
  }
};

document.addEventListener("DOMContentLoaded", main);
