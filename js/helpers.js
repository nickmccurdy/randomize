"use strict";

// Helper functions for generating random data
var Helpers = {

  // Collects the list text input (used for list sampling and sorting),
  // separates it on each newline, and returns an array of strings. If the
  // input is empty, it returns an array with the string "list is empty".
  getInputList: function () {
    var inputText = $(".list-options textarea").val() || "list is empty";
    return inputText.split("\n");
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
    var suits = ["diamonds", "hearts", "spades", "clubs"];
    var cards = suits.reduce(function (memo, suit) {
      return memo.concat(_.range(1, 14).map(function (value) {
        return {
          file: suit[0] + value,
          alt: value + " of " + suit
        };
      }));
    }, []);
    var jokers = [
      { file: "jb", alt: "black joker" },
      { file: "jr", alt: "red joker" }
    ];

    // Add jokers to the deck
    cards.concat(jokers);

    // Return the result, which is automatically memoized due to the _.once()
    // call.
    return cards;
  })

};
