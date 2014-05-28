"use strict";

// Preloads all images on the page by adding them to an invisible container
// tag
var Preloader = {
  preload: function () {
    // Coin images
    var coinImages = ["images/coins/coin_heads.png", "images/coins/coin_tails.png"];

    // Die images
    var dieImages = _.range(1, 7).map(function (value) {
      return "images/dice/die_" + value + ".png";
    });

    // Card images
    var cardImages = ["c", "d", "h", "s"].reduce(function (memo, suit) {
      return memo.concat(_.range(1, 14).map(function (value) {
        return "images/cards/" + suit + value + ".png";
      }));
    }, []);
    cardImages.push("images/cards/jb.png", "images/cards/jr.png");

    // Bring all of the image types together
    var images = [].concat(coinImages, dieImages, cardImages);

    // Load all the images onto the page
    var preload_html = images.reduce(function (html, file) {
      return html + "<img src='" + file + "'>";
    }, "");
    $("<div id='preloader'></div>").appendTo("body").hide().html(preload_html);
  }
};