/******************************************
 *  Author : Author
 *  Created On : Sun Nov 26 2023
 *  File : site.js
 *******************************************/
let downloadBtn;
let content;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  downloadBtn = document.querySelector(".downloadBtn");
  content = document.querySelector(".content");
};

const prepareDOMEvents = () => {
  downloadBtn.addEventListener("click", saveAsPDF);
};

const saveAsPDF = () => {
  let opt = {
    margin: 0,
    filename: "CV_Dyda_Tomasz.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 5 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(content).save();
};

// const addFontFamily = () => {
//     let fontFamilyPreconnectAPI = document.createElement("link");
//     fontFamilyPreconnectAPI.setAttribute("rel", "preconnect");
//     fontFamilyPreconnectAPI.setAttribute("href", "https://fonts.googleapis.com");

//     let fontFamilyPreconnectGstatic = document.createElement("link");
//     fontFamilyPreconnectGstatic.setAttribute("rel", "preconnect");
//     fontFamilyPreconnectGstatic.setAttribute("href", "https://fonts.gstatic.com");

//     let fontFamily = document.createElement("link");
//     fontFamily.setAttribute("rel", "stylesheet");
//     fontFamily.setAttribute(
//       "href",
//       "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;800&display=swap"
//     );

//     console.log(fontFamilyPreconnectAPI);
//     console.log(fontFamilyPreconnectGstatic);
//     console.log(fontFamily);

//     HTMLhead.append(
//       fontFamilyPreconnectAPI,
//       fontFamilyPreconnectGstatic,
//       fontFamily
//     );
//   };

document.addEventListener("DOMContentLoaded", main);
