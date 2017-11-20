'use strict';

var COLUM_NWIDTH = 40;
var COLUMN_SPACER = 50;
var HYSTOGRAM_HEIGHT = 150;
var SPACER_HEIGHT = 4;
var TEXT_HEIGHT = 16;
var TEXT_X = 120;
var TEXT_Y = 32;
var SPACE_LEFT = 150;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHIFT_SHADOW = 10;
var MIN_VISABILITY = 0.2;
var MAX_VISABILITY = 1;


var setColor = function(name){
  if (name === "Вы"){
    return 'rgba(255, 0, 0, 1)';
  }
  return 'rgba(0, 0, 255,' + getRandom(MIN_VISABILITY, MAX_VISABILITY) + ')';
}

var getMaxResult = function(times){
  var max = times[0];
  for (var i = 0; i <= times.length; i++){
    if (max < times[i])  max = times[i];
  }
  return max;
}

var renderCloud = function(ctx){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X + SHIFT_SHADOW, CLOUD_Y + SHIFT_SHADOW, CLOUD_WIDTH, CLOUD_HEIGHT);
  
  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var renderHistogram = function(ctx, names, times){
  var bottomMargin = SPACER_HEIGHT + 5 * TEXT_HEIGHT  + HYSTOGRAM_HEIGHT; 
  
  for(var i = 0; i<times.length; i++) {
    var columnHeight = times[i] / getMaxResult(times) * HYSTOGRAM_HEIGHT;
    var columnY = bottomMargin - columnHeight;
    var scoreY = columnY  - (SPACER_HEIGHT + TEXT_HEIGHT);
    var columnX = SPACE_LEFT + (COLUM_NWIDTH + COLUMN_SPACER) * i;
	 
    ctx.fillStyle = setColor(names[i]);
    ctx.fillRect(columnX, columnY, COLUM_NWIDTH, columnHeight);
	 
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), columnX, columnY - TEXT_HEIGHT);
    ctx.fillText(names[i], columnX, columnY + SPACER_HEIGHT +  columnHeight);
  }	
}

var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
}

window.renderStatistics = function (ctx, names, times){
  
  renderCloud(ctx);
  
  ctx.fillStyle = 'black';
  ctx.font = TEXT_HEIGHT + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + TEXT_HEIGHT);

  renderHistogram(ctx, names, times);  
}
