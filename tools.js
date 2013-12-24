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

    var result = _.random(1, 7);

    View.display("<img src='images/dice/die_" + result + ".png' alt='" + result + " ' height='100' class='number'></img>");
  },

  // Flips a coin and displays a penny on heads or tails
  coin: function () {
    View.mode = "coin";

    var result = _.sample(["heads", "tails"]);

    View.display("<img src='images/coins/coin_" + result + ".png' alt='" + result + "' height='100' class='text'></img>");
  },

  // Picks a random card from a deck of 52 cards (with two added Jokers) and
  // displays the appropriate card image
  card: function () {
    View.mode = "card";

    // Build the deck of cards (with Jokers)
    var
      suits = ["diamonds", "hearts", "spades", "clubs"],
      cards = suits.reduce(function (memo, suit) {
        return memo.concat(_.range(1, 14).map(function (value) {
          return {
            file: suit[0] + value,
            alt: value + " of " + suit
          };
        }));
      }, []),
      card;
    cards.push({ file: "jb", alt: "black joker" });
    cards.push({ file: "jr", alt: "red joker" });

    // Pick a card at random
    card = _.sample(cards);

    View.display("<img src='images/cards/" + card.file + ".png' alt='" + card.alt + "' height='100' class='text'></img>");
  },

  // Picks a random number from a given minimum to a given maximum (inclusive).
  // By default, the minimum and maximum values are 1 and 10. The appropriate
  // number is displayed with the minimum and maximum values.
  number: function () { //BUGGY
    View.mode = "number";

    var minimum, maximum, result;
    minimum = parseInt($("#minimum").val(), 10) || 1;
    maximum = parseInt($("#maximum").val(), 10) || 10;
    result = _.random(minimum, maximum + 1);

    View.display("<span class='number'>" + result + " </span><br><span class='mute'>from " + minimum + "  to " + maximum + "  </span>");
  },

  // Picks a random element from a given list of text and displays it
  from_list: function () {
    View.mode = "from_list";

    var result = Utilities.getShuffledInput()[0];
    /*
    var quantity = 2;
    for(var i=0;i<quantity;i++) {
      result = result + " <br>" + text_array[i+1];
    }
    */

    View.display("<span class='text'>" + result + " </span>");
  },

  // Randomly sorts a given list of text and displays it in an numbered list
  sort_list: function () {
    View.mode = "sort_list";

    var result = Utilities.getShuffledInput().join("</li><li>");

    View.display("<span class='list'><ul><li>" + result + " </li></ul></span>");
  }

};
