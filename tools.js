// mode scripts

function die() {
	switchMode("die");
	var roll = Math.floor(Math.random()*6+1);
	display("<img src='images/dice/die_"+roll+".png' alt='"+roll+"' height='100' id='number'></img>");
}
function coin() {
	switchMode("coin");
	var roll = Math.floor(Math.random()*2+1);
	if(roll==1) {
		display("<img src='images/coins/coin_heads.png' alt='heads' height='100' id='text'></img>");
	}
	if(roll==2) {
		display("<img src='images/coins/coin_tails.png' alt='tails' height='100' id='text'></img>");
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
	display("<span id='number'>"+roll+"</span><br><span class='mute'>from "+minimum+" to "+maximum+" </span>");
	
}
function from_list()
{
	var result;
	if($("#list-options textarea").val()) {
		result = $("#list-options textarea").val();
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
	if($("#list-options textarea").val()) {
		result = $("#list-options textarea").val();
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
