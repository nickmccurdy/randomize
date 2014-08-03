'use strict';

var app = angular.module('randomize.controllers', []);

// Functions for updating and setting up the views for all tools
app.controller('ToolController', function ($scope, $location, $route) {

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  // Repeats running the current tool with its current settings
  $scope.reload = $route.reload;

  // Set up the page
  $scope.areOptionsDisplayed = function () {
    return _.contains(['/fromList', '/sortList', '/numbers'], $location.path());
  };
  $scope.areNumberOptionsDisplayed = function () {
    return $location.path() === '/numbers';
  };
  $scope.areListOptionsDisplayed = function () {
    return _.contains(['/fromList', '/sortList'], $location.path());
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
