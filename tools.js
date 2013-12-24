"use strict";

// Helper functions for generating random data
var Utilities = {

  // Collects the list text input (used for list sampling and sorting),
  // separates it on each newline, shuffles it, and returns an array of strings.
  // If the input is empty, it returns an array with the string "list is empty".
  getShuffledInput: function () {
    var inputText = ($(".list-options textarea").val() || "list is empty");
    return _.shuffle(inputText.split("\n"));
  }

};

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
    var result = _.random(1, 55),
      file,
      alt;

    if (result >= 1 && result <= 13) {
      // Diamonds
      file = "d" + result;
      alt = result + " of diamonds";
    } else if (result >= 14 && result <= 26) {
      // Hearts
      file = "h" + (result - 13);
      alt = (result - 13) + " of hearts";
    } else if (result >= 27 && result <= 39) {
      // Spades
      file = "s" + (result - 26);
      alt = (result - 26) + " of spades";
    } else if (result >= 40 && result <= 52) {
      // Clubs
      file = "c" + (result - 39);
      alt = (result - 39) + " of clubs";
    } else if (result === 53) {
      // Black joker
      file = "jb";
      alt = "black joker";
    } else if (result === 54) {
      // Red joker
      file = "jr";
      alt = "red joker";
    }

    return {
      mode: "card",
      file: file,
      alt: alt
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
      result: Utilities.getShuffledInput()[0]
    };
  },

  // Randomly sorts a given list of text
  sort_list: function () {
    return {
      mode: "sort_list",
      result: Utilities.getShuffledInput()
    };
  }

};
