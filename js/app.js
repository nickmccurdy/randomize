"use strict";

var app = angular.module("Randomize", []);

// Functions for updating and setting up the views for all tools
app.controller("ToolController", function ($scope) {

  // The mode, representing the current tool. Each tool has a string name that
  // the mode can be set to.
  $scope.mode = undefined;

  // Displays the given tool results data on the page. Renders the data using
  // the template for the appropriate mode, represented in the data argument
  // under the "mode" key. Animates any transitions between results and tools as
  // needed.
  $scope.render = function (mode, data) {
    // Update the current mode
    $scope.mode = mode;

    // Render the data with the appropriate template
    $scope.data = data;

    // Set the result HTML on the page
    if (!$(".results").is(":visible")) {
      $("#welcome").hide();
      $(".results, .reload-button, .options").show();
    }

    // Animate tool transitions
    $scope.runTransitions();
  };

  // Animates tool transitions based on the current mode
  $scope.runTransitions = function () {
    if ($scope.mode === "from_list" || $scope.mode === "sort_list") {
      $(".options-header").show();
      $(".number-options").hide();
      $(".list-options").show();
    } else if ($scope.mode === "number") {
      $(".options-header").show();
      $(".list-options").hide();
      $(".number-options").show();
    } else {
      $(".list-options, .number-options, .options-header").hide();
    }
    $("#results-header").show();
  };

  // Repeats running the current tool with its current settings
  $scope.reload = function () {
    var result = Tools[$scope.mode]();
    $scope.render($scope.mode, result);
  };

  // Set up the page
  $scope.switchTool = function (mode) {
    $scope.render(mode, Tools[mode]());
  };

});

// A helper for preloading image files
app.controller("PreloaderController", function ($scope) {

  // Coin images
  $scope.coinImages = function () {
    return ["images/coins/coin_heads.png", "images/coins/coin_tails.png"];
  };

  // Die images
  $scope.dieImages = function () {
    return _.range(1, 7).map(function (value) {
      return "images/dice/die_" + value + ".png";
    });
  };

  // Card images
  $scope.cardImages = function () {
    return ["c", "d", "h", "s"].reduce(function (memo, suit) {
      return memo.concat(_.range(1, 14).map(function (value) {
        return "images/cards/" + suit + value + ".png";
      }));
    }, []).concat(["images/cards/jb.png", "images/cards/jr.png"]);
  };

  // Bring all of the image types together
  $scope.images = [].concat($scope.coinImages(),
                            $scope.dieImages(),
                            $scope.cardImages());

});
