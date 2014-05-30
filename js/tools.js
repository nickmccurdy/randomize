"use strict";

// A collection of the 6 different tools in Randomize. Each tool collects the
// appropriate input settings and returns a data object of its results.
var Tools = {

  // Picks a random number from 1 to 6
  die: function () {
    return _.random(1, 6);
  },

  // Flips a coin (picking heads or tails)
  coin: function () {
    return _.sample(["heads", "tails"]);
  },

  // Picks a random card from a deck of 52 cards (with two added Jokers)
  card: function () {
    // Pick a card at random
    return _.sample(Helpers.getCards());
  },

  // Picks a random number from a given minimum to a given maximum (inclusive).
  // By default, the minimum and maximum values are 1 and 10.
  number: function () { //BUGGY
    var minimum = parseInt(angular.element("#minimum").val(), 10) || 1;
    var maximum = parseInt(angular.element("#maximum").val(), 10) || 10;

    return {
      result: _.random(minimum, maximum),
      minimum: minimum,
      maximum: maximum
    };
  },

  // Picks a random element from a given list of text
  from_list: function () {
    return _.sample(Helpers.getInputList());
  },

  // Randomly sorts a given list of text
  sort_list: function () {
    return _.shuffle(Helpers.getInputList());
  }

};
