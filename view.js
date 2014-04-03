"use strict";

// The default speed for jQuery animations
$.fx.speeds._default = 200;

// Functions for updating and setting up the views for all tools
var View = {

  // The mode, representing the current tool. Each tool has a string name that
  // the mode can be set to.
  mode: undefined,

  // Displays the given tool results data on the page. Renders the data using
  // the template for the appropriate mode, represented in the data argument
  // under the "mode" key. Animates any transitions between results and tools as
  // needed.
  display: function (data) {
    // Update the current mode
    View.mode = data.mode;

    // Render the data with the appropriate template
    var results = _.template($("#" + data.mode + "-template").html(), data);

    // Set the result HTML on the page
    if ($(".results").is(":visible")) {
      $(".results").fadeOut(function () {
        $(".results").html(results);
      });
      $(".results").fadeIn();
    } else {
      $("#welcome").slideUp(function () {
        $(".results").html(results);
        $(".results, .reload-button, .options").slideDown();
      });
    }

    // Animate tool transitions
    View.runTransitions();
  },

  // Animates tool transitions based on the current mode
  runTransitions: function () {
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
    $("#results-header").slideDown();
  },

  // Repeats running the current tool with its current settings
  reload: function () {
    var result = Tools[View.mode]();
    View.display(result);
  },

  // Preloads all images on the page by adding them to an invisible container
  // tag
  preload: function () {
    var images, coinImages, dieImages, cardImages, preload_html;

    // Coin images
    coinImages = ["images/coins/coin_heads.png", "images/coins/coin_tails.png"];

    // Die images
    dieImages = _.range(1, 7).map(function (value) {
      return "images/dice/die_" + value + ".png";
    });

    // Card images
    cardImages = ["c", "d", "h", "s"].reduce(function (memo, suit) {
      return memo.concat(_.range(1, 14).map(function (value) {
        return "images/cards/" + suit + value + ".png";
      }));
    }, []);
    cardImages.push("images/cards/jb.png", "images/cards/jr.png");

    // Bring all of the image types together
    images = [].concat(coinImages, dieImages, cardImages);

    // Load all the images onto the page
    preload_html = images.reduce(function (html, file) {
      return html + "<img src='" + file + "'>";
    }, "");
    $("<div id='preloader'></div>").appendTo("body").hide().html(preload_html);
  },

  // Binds a collection of elements to their associated tool/utility functions.
  // Takes in a hash, where the keys are CSS selectors to elements and the
  // values are functions to bind to the click events of the appropriate
  // elements.
  setBinds: function (binds) {
    _.each(binds, function (fun, el) {
      $(el).click(fun);
    });
  }

};

// Sets up the page when the document is ready
$(function () {
  View.setBinds({
    "#dice-button":      function () { View.display(Tools.die()); },
    "#coins-button":     function () { View.display(Tools.coin()); },
    "#card-button":      function () { View.display(Tools.card()); },
    "#numbers-button":   function () { View.display(Tools.number()); },
    "#from-list-button": function () { View.display(Tools.from_list()); },
    "#sort-list-button": function () { View.display(Tools.sort_list()); },
    ".reload-button":    View.reload
  });

  View.preload();
});
