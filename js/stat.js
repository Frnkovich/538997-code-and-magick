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
var SHIFT_CLOUD = 10;
var MIN_VISABILITY = 0.2;
var MAX_VISABILITY = 1;


var setColor = function(name){
  if (name === "Вы"){
    return 'rgba(255, 0, 0, 1)';
  }
  return 'rgba(0, 0, 255,' + getRandom(minVisability, maxVisability) + ')';
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
  ctx.fillRect(cloudX + shiftCloud, cloudY + shiftCloud, cloudWidth, cloudHeight);
  
  ctx.fillStyle = 'white';
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);
}

var renderHistogram = function(ctx, names, times){
  var bottomMargin = spacerHeight + 5 * textHeight  + hystogramHeight; 
  
  for(var i = 0; i<times.length; i++) {
    var columnHeight = times[i] / getMaxResult(times) * hystogramHeight;
    var columnY = bottomMargin - columnHeight;
    var scoreY = columnY  - (spacerHeight + textHeight);
    var columnX = spaceLeft + (columnWidth + columnSpacer) * i;
	 
    ctx.fillStyle = setColor(names[i]);
    ctx.fillRect(columnX, columnY, columnWidth, columnHeight);
	 
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), columnX, columnY - textHeight);
    ctx.fillText(names[i], columnX, columnY + spacerHeight +  columnHeight);
  }	
}

var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
}

window.renderStatistics = function (ctx, names, times){
  
  renderCloud(ctx);
  
  ctx.fillStyle = 'black';
  ctx.font = textHeight + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', textX, textY);
  ctx.fillText('Список результатов:', textX, textY + textHeight);

  renderHistogram(ctx, names, times);  
}
