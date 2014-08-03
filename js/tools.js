'use strict';

// A collection of the 6 different tools in Randomize. Each tool collects the
// appropriate input settings and returns a data object of its results.
var tools = angular.module('randomize.tools', []);

// Helper functions for generating random data
var Helpers = {

  // Collects the list text input (used for list sampling and sorting),
  // separates it on each newline, and returns an array of strings. If the
  // input is empty, it returns an array with the string 'list is empty'.
  getInputList: function () {
    var inputText = document.querySelector('.list-options textarea').value || 'list is empty';
    return inputText.split('\n');
  },

  // Builds a deck of 52 cards (with 2 Jokers) and returns it. The result of
  // this function is automatically memoized for efficiency, so the deck of
  // cards is only generated once when calling this function multiple times.
  //
  // The result of this function is represented as an array of cards (objects)
  // with 54 items. Each card has a file property (representing the filename of
  // its image, without any extensions) and an alt property (representing the
  // English description of the card, used for its alt text).
  getCards: _.once(function () {
    // Set up suits, normal cards, and joker cards
    var suits = ['diamonds', 'hearts', 'spades', 'clubs'];
    var cards = suits.reduce(function (memo, suit) {
      return memo.concat(_.range(1, 14).map(function (value) {
        return {
          file: suit[0] + value,
          alt: value + ' of ' + suit
        };
      }));
    }, []);
    var jokers = [
      { file: 'jb', alt: 'black joker' },
      { file: 'jr', alt: 'red joker' }
    ];

    // Add jokers to the deck
    cards.concat(jokers);

    // Return the result, which is automatically memoized due to the _.once()
    // call.
    return cards;
  })

};

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
