"use strict";

// A helper for preloading image files
var Preloader = {

  // Coin images
  coinImages: ["images/coins/coin_heads.png", "images/coins/coin_tails.png"],

  // Die images
  dieImages: _.range(1, 7).map(function (value) {
    return "images/dice/die_" + value + ".png";
  }),

  // Card images
  cardImages: ["c", "d", "h", "s"].reduce(function (memo, suit) {
    return memo.concat(_.range(1, 14).map(function (value) {
      return "images/cards/" + suit + value + ".png";
    }));
  }, []).concat["images/cards/jb.png", "images/cards/jr.png"],

  // Bring all of the image types together
  images: [].concat(Preloader.coinImages, Preloader.dieImages, Preloader.cardImages),

  // Preloads all images on the page by adding them to an invisible container
  // tag
  preload: function () {
    var preload_html = _.template($("#preloader-template").html(),
                                  { images: Preloader.images});
    $("<div id='preloader'></div>").appendTo("body").hide().html(preload_html);
  }

};