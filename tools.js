"use strict";

// Helper functions for generating random data
var Utilities = {

  // Collects the list text input (used for list sampling and sorting),
  // separates it on each newline, shuffles it, and returns an array of strings.
  // If the input is empty, it returns an array with the string "list is empty".
  getShuffledInput: function () {
    var inputText = ($(".list-options textarea").val() || "list is empty");
    return _.shuffle(inputText.split("\n"));
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
    // Add all suit-based cards to the deck
    var
      suits = ["diamonds", "hearts", "spades", "clubs"],
      cards = suits.reduce(function (memo, suit) {
        return memo.concat(_.range(1, 14).map(function (value) {
          return {
            file: suit[0] + value,
            alt: value + " of " + suit
          };
        }));
      }, []);

    // Add jokers to the deck
    cards.push({ file: "jb", alt: "black joker" });
    cards.push({ file: "jr", alt: "red joker" });

    // Return the result, which is automatically memoized due to the _.once()
    // call.
    return cards;
  })

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
    // Pick a card at random
    var card = _.sample(Utilities.getCards());

    return {
      mode: "card",
      file: card.file,
      alt: card.alt
    }
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
