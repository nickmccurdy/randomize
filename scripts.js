// system scripts

$.fx.speeds._default = 200;
var mode,
  mode_last,
  options_display = false,
  nothing = "",
  minimum = 1,
  maximum = 10;

function display(results) {
  if ($(".results").is(":visible")) {
    $(".results").fadeOut(function () {
      $(".results").html(results);
    });
    $(".results").fadeIn();
    /*
    if () { //this is for shit that needs to fade in or out when you're switching modes
      $(".options").slideUp(function () {});
      $(".options").slideDown();
    }
    */
  } else {
    $("#welcome").slideUp(function () {
      $(".results").html(results);
      $(".results, .reload-button, .options").slideDown();
    });
  }
  if (mode === "from_list" || mode === "sort_list") {
    $(".options-header").slideDown();
    $(".number-options").slideUp(function () {
      $(".list-options").slideDown();
    });
  } else if (mode === "number") {
    $(".options-header").slideDown();
    $(".list-options").slideUp(function () {
      $(".number-options").slideDown();
    });
  } else {
    $(".list-options, .number-options, .options-header").slideUp();
  }
}

function reload() {
  Tools[mode]();
}


function switchMode(mode_new) {
  mode_last = mode;
  mode = mode_new;
}

function preload() {
  var to_preload = [], i, preload_html = "", preload_size;
  // coins
  to_preload.push("images/coins/coin_heads.png");
  to_preload.push("images/coins/coin_tails.png");
  // dice
  for (i = 1; i <= 6; i++) { to_preload.push("images/dice/die_" + i + ".png"); }
  // cards
  for (i = 1; i <= 13; i++) { to_preload.push("images/cards/c" + i + ".png"); }
  for (i = 1; i <= 13; i++) { to_preload.push("images/cards/d" + i + ".png"); }
  for (i = 1; i <= 13; i++) { to_preload.push("images/cards/h" + i + ".png"); }
  for (i = 1; i <= 13; i++) { to_preload.push("images/cards/s" + i + ".png"); }
  to_preload.push("images/cards/jb.png");
  to_preload.push("images/cards/jr.png");

  // load stuff!
  preload_size = to_preload.length;
  for (i = 0; i < preload_size; i++) {
    preload_html += "<img src='" + to_preload.shift() + "'>";
  }
  $("<div id='preloader'></div>").appendTo("body").hide().html(preload_html);
}

$(function ($) {
  // buttons
  $("#dice-button").click(Tools.die);
  $("#coins-button").click(Tools.coin);
  $("#card-button").click(Tools.card);
  $("#numbers-button").click(Tools.number);
  $("#from-list-button").click(Tools.from_list);
  $("#sort-list-button").click(Tools.sort_list);
  $(".reload-button").click(reload);

  // preload
  preload();
});
