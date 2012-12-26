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
			$("#options").fadeOut(function() {});
			$("#options").fadeIn();
		}
		*/
	}
	else {
		$("#welcome").fadeOut(function() {
			$("#results").html(results);
			$("#results").fadeIn();
			$("#reload-button").fadeIn();
			$("#options").fadeIn();
		});
	}
	if(mode=="from_list" || mode=="sort_list") {
		$("#options-header").fadeIn();
		$("#number_options").fadeOut(function() {
			$("#list_options").fadeIn();
		});
	}
	else if(mode=="number") {
		$("#options-header").fadeIn();
		$("#list_options").fadeOut(function() {
			$("#number_options").fadeIn();
		});
	}
	else {
		$("#list_options").fadeOut();
		$("#number_options").fadeOut();
		$("#options-header").fadeOut();
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
	$("#dice-button").click(function() {
		die();
	});
	$("#coins-button").click(function() {
		coin();
	});
	$("#card-button").click(function() {
		card();
	});
	$("#numbers-button").click(function() {
		number();
	});
	$("#from-list-button").click(function() {
		from_list();
	});
	$("#sort-list-button").click(function() {
		sort_list();
	});
	$("#reload-button").click(function() {
		reload();
	});
	
	// preload
	preload();
});

/*
function preload(arrayOfImages) {
    $(arrayOfImages).each(function() {
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}
*/

// mode scripts

function die() {
	switchMode("die");
	var roll = Math.floor(Math.random()*6+1);
	display("<img src='images/die_"+roll+".png' alt='"+roll+"' height='100' id='number'></img>");
}
function coin() {
	switchMode("coin");
	var roll = Math.floor(Math.random()*2+1);
	if(roll==1) {
		display("<img src='images/coin_heads.png' alt='heads' height='100' id='text'></img>");
	}
	if(roll==2) {
		display("<img src='images/coin_tails.png' alt='tails' height='100' id='text'></img>");
	}
}
function card() {
	switchMode("card");
	var roll = Math.floor(Math.random()*54+1);
	if(roll>=1 && roll<=13) {
		display("<img src='images/cards/d"+roll+".png' alt='"+roll+" of diamonds' height='100' id='text'></img>");
	}
	if(roll>=14 && roll<=26) {
		display("<img src='images/cards/h"+(roll-13)+".png' alt='"+(roll-13)+" of hearts' height='100' id='text'></img>");
	}
	if(roll>=27 && roll<=39) {
		display("<img src='images/cards/s"+(roll-26)+".png' alt='"+(roll-26)+" of spades' height='100' id='text'></img>");
	}
	if(roll>=40 && roll<=52) {
		display("<img src='images/cards/c"+(roll-39)+".png' alt='"+(roll-39)+" of clubs' height='100' id='text'></img>");
	}
	if(roll==53) {
		display("<img src='images/cards/jb.png' alt='black joker' height='100' id='text'></img>");
	}
	if(roll==54) {
		display("<img src='images/cards/jr.png' alt='red joker' height='100' id='text'></img>");
	}
}
function number() { //BUGGY
	switchMode("number");
	if(parseInt($("#minimum").val(), 10) && parseInt($("#maximum").val(), 10)) {
		mininum = parseInt($("#minimum").val(), 10);
		maximum = parseInt($("#maximum").val(), 10);
	}
	else {
		minimum = 1;
		maximum = 10;
	}
	var roll = Math.floor(Math.random()*maximum+minimum);
	display("<span id='number'>"+roll+"</span><br><span id='info'>from "+minimum+" to "+maximum+" </span>");
	
}
function from_list()
{
	var result;
	if($("#list_options textarea").val()) {
		result = $("#list_options textarea").val();
	}
	else {
		result = "list is empty";
	}
	switchMode("from_list");
	var text_array = [];
	text_array = result.split("\n");
	text_array = text_array.sort(function() {
		return 0.5 - Math.random();
	});
	result = text_array[0];
	/*
	var quantity = 2;
	for(var i=0;i<quantity;i++) {
		result = result+"<br>"+text_array[i+1];
	}
	*/
	display("<span id='text'>"+result+"</span>");
}
function sort_list()
{
	var result;
	if($("#list_options textarea").val()) {
		result = $("#list_options textarea").val();
	}
	else {
		result = "list is empty";
	}
	switchMode("sort_list");
	var text_array = [];
	text_array = result.split("\n");
	text_array = text_array.sort(function() {
		return 0.5 - Math.random();
	});
	result = text_array.join("</li><li>");
	display("<span id='list'><ul><li>"+result+"</li></ul></span>");
}
