// system scripts
"use strict";

$.fx.speeds._default = 200;

var View = {

  mode: undefined,

  display: function (results) {
    if ($(".results").is(":visible")) {
      $(".results").fadeOut(function () {
        $(".results").html(results);
      });
      $(".results").fadeIn();
      /*
      if () { //this is for shit that needs to fade in or out when you're switching modes
        $(".options").slideUp(function () {});
        $(".options").slideDown();
      }
      */
    } else {
      $("#welcome").slideUp(function () {
        $(".results").html(results);
        $(".results, .reload-button, .options").slideDown();
      });
    }
    if (View.mode === "from_list" || View.mode === "sort_list") {
      $(".options-header").slideDown();
      $(".number-options").slideUp(function () {
        $(".list-options").slideDown();
      });
    } else if (View.mode === "number") {
      $(".options-header").slideDown();
      $(".list-options").slideUp(function () {
        $(".number-options").slideDown();
      });
    } else {
      $(".list-options, .number-options, .options-header").slideUp();
    }
  },

  reload: function () {
    Tools[View.mode]();
  },

  preload: function () {
    var images, coinImages, dieImages, cardImages, preload_html;

    // coins
    coinImages = ["images/coins/coin_heads.png", "images/coins/coin_tails.png"];

    // dice
    dieImages = [1, 2, 3, 4, 5, 6].map(function (value) {
      return "images/dice/die_" + value + ".png";
    });

    // cards
    cardImages = [];
    ["c", "d", "h", "s"].forEach(function (suit) {
      var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        suitCards = values.forEach(function (value) {
          return "images/cards/" + suit + value + ".png";
        });
      cardImages = cardImages.concat(suitCards);
    }, []);
    cardImages.push("images/cards/jb.png", "images/cards/jr.png");

    images = [].concat(coinImages, dieImages, cardImages);

    // load stuff!
    preload_html = images.reduce(function (html, file) {
      html = html + "<img src='" + file + "'>";
    }, "");
    $("<div id='preloader'></div>").appendTo("body").hide().html(preload_html);
  },

  setBinds: function (binds) {
    $.each(binds, function (el, fun) {
      $(el).click(fun);
    });
  }

};

$(function () {
  // buttons
  View.setBinds({
    "#dice-button":      Tools.die,
    "#coins-button":     Tools.coin,
    "#card-button":      Tools.card,
    "#numbers-button":   Tools.number,
    "#from-list-button": Tools.from_list,
    "#sort-list-button": Tools.sort_list,
    ".reload-button":    View.reload
  });

  // preload
  View.preload();
});
