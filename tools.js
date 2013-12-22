// mode scripts
"use strict";

var Utilities = {

  getShuffledInput: function () {
    var inputText = ($(".list-options textarea").val() || "list is empty");
    return _.shuffle(inputText.split("\n"));
  }

};

var Tools = {

  die: function () {
    View.mode = "die";
    var result = _.random(1, 7);
    View.display("<img src='images/dice/die_" + result + " .png' alt='" + result + " ' height='100' class='number'></img>");
  },

  coin: function () {
    View.mode = "coin";
    var result = _.sample(["heads", "tails"]);
    View.display("<img src='images/coins/coin_" + result + ".png' alt='" + result + "' height='100' class='text'></img>");
  },

  card: function () {
    View.mode = "card";
    var result = _.random(1, 55);
    if (result >= 1 && result <= 13) {
      View.display("<img src='images/cards/d" + result + " .png' alt='" + result + "  of diamonds' height='100' class='text'></img>");
    }
    if (result >= 14 && result <= 26) {
      View.display("<img src='images/cards/h" + (result - 13) + " .png' alt='" + (result - 13) + "  of hearts' height='100' class='text'></img>");
    }
    if (result >= 27 && result <= 39) {
      View.display("<img src='images/cards/s" + (result - 26) + " .png' alt='" + (result - 26) + "  of spades' height='100' class='text'></img>");
    }
    if (result >= 40 && result <= 52) {
      View.display("<img src='images/cards/c" + (result - 39) + " .png' alt='" + (result - 39) + "  of clubs' height='100' class='text'></img>");
    }
    if (result === 53) {
      View.display("<img src='images/cards/jb.png' alt='black joker' height='100' class='text'></img>");
    }
    if (result === 54) {
      View.display("<img src='images/cards/jr.png' alt='red joker' height='100' class='text'></img>");
    }
  },

  number: function () { //BUGGY
    View.mode = "number";
    var minimum, maximum, result;
    minimum = parseInt($("#minimum").val(), 10) || 1;
    maximum = parseInt($("#maximum").val(), 10) || 10;
    result = _.random(minimum, maximum + 1);
    View.display("<span class='number'>" + result + " </span><br><span class='mute'>from " + minimum + "  to " + maximum + "  </span>");
  },

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

  sort_list: function () {
    View.mode = "sort_list";
    var result = Utilities.getShuffledInput().join("</li><li>");
    View.display("<span class='list'><ul><li>" + result + " </li></ul></span>");
  }

};
