// system scripts

$.fx.speeds._default = 200;
var mode;
var mode_last;
var options_display = false;
var nothing = "";
var minimum = 1;
var maximum = 10;

function display(results) {
  if($("#results").is(":visible")) {
    $("#results").fadeOut(function() {
      $("#results").html(results);
    });
    $("#results").fadeIn();
    /*
    if() { //this is for shit that needs to fade in or out when you're switching modes
      $("#options").slideUp(function() {});
      $("#options").slideDown();
    }
    */
  }
  else {
    $("#welcome").slideUp(function() {
      $("#results").html(results);
      $("#results, #reload-button, #options").slideDown();
    });
  }
  if(mode=="from_list" || mode=="sort_list") {
    $("#options-header").slideDown();
    $("#number-options").slideUp(function() {
      $("#list-options").slideDown();
    });
  }
  else if(mode=="number") {
    $("#options-header").slideDown();
    $("#list-options").slideUp(function() {
      $("#number-options").slideDown();
    });
  }
  else {
    $("#list-options, #number-options, #options-header").slideUp();
  }
}

function reload() {
  switch(mode) {
    case "die": die(); break;
    case "coin": coin(); break;
    case "card": card(); break;
    case "number": number(); break;
    case "from_list": from_list(); break;
    case "sort_list": sort_list(); break;
  }
}


function switchMode(mode_new) {
  mode_last = mode;
  mode = mode_new;
}

function preload() {
  var to_preload = [];
  var i;
  // coins
  to_preload.push("images/coins/coin_heads.png");
  to_preload.push("images/coins/coin_tails.png");
  // dice
  for(i=1; i<=6; i++) {to_preload.push("images/dice/die_"+i+".png");}
  // cards
  for(i=1; i<=13; i++) {to_preload.push("images/cards/c"+i+".png");}
  for(i=1; i<=13; i++) {to_preload.push("images/cards/d"+i+".png");}
  for(i=1; i<=13; i++) {to_preload.push("images/cards/h"+i+".png");}
  for(i=1; i<=13; i++) {to_preload.push("images/cards/s"+i+".png");}
  to_preload.push("images/cards/jb.png");
  to_preload.push("images/cards/jr.png");
  
  // load stuff!
  var preload_html = "";
  var preload_size = to_preload.length;
  for(i=0; i<preload_size; i++) {
    preload_html += "<img src='"+to_preload.shift()+"'>";
  }
  $("<div id='preloader'></div>").appendTo("body").hide().html(preload_html);
}

$(function($) {
  // buttons
  $("#dice-button").click(die);
  $("#coins-button").click(coin);
  $("#card-button").click(card);
  $("#numbers-button").click(number);
  $("#from-list-button").click(from_list);
  $("#sort-list-button").click(sort_list);
  $("#reload-button").click(reload);
  
  // preload
  preload();
});
