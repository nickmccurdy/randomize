"use strict";

// A collection of the 6 different tools in Randomize. Each tool collects the
// appropriate input settings and returns a data object of its results, which
// will later be passed into View.display().
var Tools = {

  // Picks a random number from 1 to 6
  die: function () {
    return {
      mode: "die",
      result: _.random(1, 7)
    };
  },

  // Flips a coin (picking heads or tails)
  coin: function () {
    return {
      mode: "coin",
      result: _.sample(["heads", "tails"])
    };
  },

  // Picks a random card from a deck of 52 cards (with two added Jokers)
  card: function () {
    // Pick a card at random
    var card = _.sample(Helpers.getCards());

    return {
      mode: "card",
      file: card.file,
      alt: card.alt
    };
  },

  // Picks a random number from a given minimum to a given maximum (inclusive).
  // By default, the minimum and maximum values are 1 and 10.
  number: function () { //BUGGY
    var
      minimum = parseInt($("#minimum").val(), 10) || 1,
      maximum = parseInt($("#maximum").val(), 10) || 10;

    return {
      mode: "number",
      result: _.random(minimum, maximum + 1),
      minimum: minimum,
      maximum: maximum
    };
  },

  // Picks a random element from a given list of text
  from_list: function () {
    return {
      mode: "from_list",
      result: Helpers.getShuffledInput()[0]
    };
  },

  // Randomly sorts a given list of text
  sort_list: function () {
    return {
      mode: "sort_list",
      result: Helpers.getShuffledInput()
    };
  }

};
