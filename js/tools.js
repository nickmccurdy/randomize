'use strict';

// A collection of the 6 different tools in Randomize. Each tool collects the
// appropriate input settings and returns a data object of its results.
var tools = angular.module('randomize.tools', []);

// Picks a random number from 1 to 6
tools.controller('DiceController', function ($scope) {
  $scope.result = _.random(1, 6);
})

// Flips a coin (picking heads or tails)
tools.controller('CoinsController', function ($scope) {
  $scope.result = _.sample(['heads', 'tails']);
});

// Picks a random card from a deck of 52 cards (with two added Jokers)
tools.controller('CardsController', function ($scope) {
  // Pick a card at random
  $scope.result = _.sample(Helpers.getCards());
});

// Picks a random number from a given minimum to a given maximum (inclusive).
// By default, the minimum and maximum values are 1 and 10.
tools.controller('NumbersController', function ($scope) { //BUGGY
  $scope.minimum = parseInt(document.querySelector('#minimum').value, 10) || 1;
  $scope.maximum = parseInt(document.querySelector('#maximum').value, 10) || 10;
  $scope.result = _.random($scope.minimum, $scope.maximum);
});

// Picks a random element from a given list of text
tools.controller('FromListController', function ($scope) {
  $scope.result = _.sample(Helpers.getInputList());
});

// Randomly sorts a given list of text
tools.controller('SortListController', function ($scope) {
  $scope.result = _.shuffle(Helpers.getInputList());
});
