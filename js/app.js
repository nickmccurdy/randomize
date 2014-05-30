'use strict';

var app = angular.module('Randomize', []);

// Functions for updating and setting up the views for all tools
app.controller('ToolController', function ($scope) {

  // Repeats running the current tool with its current settings
  $scope.reload = function () {
    $scope.result = Tools[$scope.mode]();
  };

  // Set up the page
  $scope.switchTool = function (mode) {
    $scope.mode = mode;
    $scope.result = Tools[mode]();
  };
  $scope.reset = function () {
    $scope.mode = undefined;
    $scope.result = undefined;
  };
  $scope.areOptionsDisplayed = function () {
    return _.contains(['fromList', 'sortList', 'number'], $scope.mode);
  };
  $scope.areNumberOptionsDisplayed = function () {
    return $scope.mode === 'number';
  };
  $scope.areListOptionsDisplayed = function () {
    return _.contains(['fromList', 'sortList'], $scope.mode);
  };

});

// A helper for preloading image files
app.controller('PreloaderController', function ($scope) {

  // Coin images
  $scope.coinImages = function () {
    return ['images/coins/coin_heads.png', 'images/coins/coin_tails.png'];
  };

  // Die images
  $scope.dieImages = function () {
    return _.range(1, 7).map(function (value) {
      return 'images/dice/die_' + value + '.png';
    });
  };

  // Card images
  $scope.cardImages = function () {
    return ['c', 'd', 'h', 's'].reduce(function (memo, suit) {
      return memo.concat(_.range(1, 14).map(function (value) {
        return 'images/cards/' + suit + value + '.png';
      }));
    }, []).concat(['images/cards/jb.png', 'images/cards/jr.png']);
  };

  // Bring all of the image types together
  $scope.images = [].concat($scope.coinImages(),
                            $scope.dieImages(),
                            $scope.cardImages());

});
