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
// appropriate input settings and displays its results on the page directly,
// returning nothing.
var Tools = {

  // Picks a random number from 1 to 6 and displays it on a die image
  die: function () {
    View.mode = "die";

    View.display(_.template($("#die-template").html(), {
      result: _.random(1, 7)
    }));
  },

  // Flips a coin and displays a penny on heads or tails
  coin: function () {
    View.mode = "coin";

    View.display(_.template($("#coin-template").html(), {
      result: _.sample(["heads", "tails"])
    }));
  },

  // Picks a random card from a deck of 52 cards (with two added Jokers) and
  // displays the appropriate card image
  card: function () {
    View.mode = "card";

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

    View.display(_.template($("#card-template").html(), {
      file: file,
      alt: alt
    }));
  },

  // Picks a random number from a given minimum to a given maximum (inclusive).
  // By default, the minimum and maximum values are 1 and 10. The appropriate
  // number is displayed with the minimum and maximum values.
  number: function () { //BUGGY
    View.mode = "number";

    var
      minimum = parseInt($("#minimum").val(), 10) || 1,
      maximum = parseInt($("#maximum").val(), 10) || 10;

    View.display(_.template($("#number-template").html(), {
      result: _.random(minimum, maximum + 1),
      minimum: minimum,
      maximum: maximum
    }));
  },

  // Picks a random element from a given list of text and displays it
  from_list: function () {
    View.mode = "from_list";

    /*
    var quantity = 2;
    for(var i=0;i<quantity;i++) {
      result = result + " <br>" + text_array[i+1];
    }
    */

    View.display(_.template($("#from_list-template").html(), {
      result: Utilities.getShuffledInput()[0]
    }));
  },

  // Randomly sorts a given list of text and displays it in an numbered list
  sort_list: function () {
    View.mode = "sort_list";

    View.display(_.template($("#sort_list-template").html(), {
      result: Utilities.getShuffledInput().join("</li><li>")
    }));
  }

};
