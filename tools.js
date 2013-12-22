// mode scripts
"use strict";

var Tools = {

  die: function () {
    View.switchMode("die");
    var roll = Math.floor(Math.random() * 6 + 1);
    View.display("<img src='images/dice/die_" + roll + " .png' alt='" + roll + " ' height='100' class='number'></img>");
  },

  coin: function () {
    View.switchMode("coin");
    var roll = Math.floor(Math.random() * 2 + 1);
    if (roll === 1) {
      View.display("<img src='images/coins/coin_heads.png' alt='heads' height='100' class='text'></img>");
    }
    if (roll === 2) {
      View.display("<img src='images/coins/coin_tails.png' alt='tails' height='100' class='text'></img>");
    }
  },

  card: function () {
    View.switchMode("card");
    var roll = Math.floor(Math.random() * 54 + 1);
    if (roll >= 1 && roll <= 13) {
      View.display("<img src='images/cards/d" + roll + " .png' alt='" + roll + "  of diamonds' height='100' class='text'></img>");
    }
    if (roll >= 14 && roll <= 26) {
      View.display("<img src='images/cards/h" + (roll - 13) + " .png' alt='" + (roll - 13) + "  of hearts' height='100' class='text'></img>");
    }
    if (roll >= 27 && roll <= 39) {
      View.display("<img src='images/cards/s" + (roll - 26) + " .png' alt='" + (roll - 26) + "  of spades' height='100' class='text'></img>");
    }
    if (roll >= 40 && roll <= 52) {
      View.display("<img src='images/cards/c" + (roll - 39) + " .png' alt='" + (roll - 39) + "  of clubs' height='100' class='text'></img>");
    }
    if (roll === 53) {
      View.display("<img src='images/cards/jb.png' alt='black joker' height='100' class='text'></img>");
    }
    if (roll === 54) {
      View.display("<img src='images/cards/jr.png' alt='red joker' height='100' class='text'></img>");
    }
  },

  number: function () { //BUGGY
    View.switchMode("number");
    if (parseInt($("#minimum").val(), 10) && parseInt($("#maximum").val(), 10)) {
      View.minimum = parseInt($("#minimum").val(), 10);
      View.maximum = parseInt($("#maximum").val(), 10);
    } else {
      View.minimum = 1;
      View.maximum = 10;
    }
    var roll = Math.floor(Math.random() * View.maximum + View.minimum);
    View.display("<span class='number'>" + roll + " </span><br><span class='mute'>from " + View.minimum + "  to " + View.maximum + "  </span>");

  },

  from_list: function () {
    var result, text_array = [];
    if ($(".list-options textarea").val()) {
      result = $(".list-options textarea").val();
    } else {
      result = "list is empty";
    }
    View.switchMode("from_list");
    text_array = result.split("\n");
    text_array = text_array.sort(function () {
      return 0.5 - Math.random();
    });
    result = text_array[0];
    /*
    var quantity = 2;
    for(var i=0;i<quantity;i++) {
      result = result + " <br>" + text_array[i+1];
    }
    */
    View.display("<span class='text'>" + result + " </span>");
  },

  sort_list: function () {
    var result, text_array = [];
    if ($(".list-options textarea").val()) {
      result = $(".list-options textarea").val();
    } else {
      result = "list is empty";
    }
    View.switchMode("sort_list");
    text_array = result.split("\n");
    text_array = text_array.sort(function () {
      return 0.5 - Math.random();
    });
    result = text_array.join("</li><li>");
    View.display("<span class='list'><ul><li>" + result + " </li></ul></span>");
  }

};
