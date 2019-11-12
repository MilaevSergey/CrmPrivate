import "./App.scss";
import objectFitImages from "object-fit-images";
import svg4everybody from "svg4everybody";
// import GeminiScrollbar from 'gemini-scrollbar';
import SideMenu from "./js/side-menu";

objectFitImages();
svg4everybody();

// let  myScrollbar = new GeminiScrollbar({
//     element: document.querySelector('.js-scrollbar')
// }).create();

// load assets
function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context("./img", true, /\.(jpe?g|png|gif)$/i));
importAll(require.context("./img/svg", true, /\.(svg)$/));

// var template = require("../server/views/layouts/layout.hbs");
