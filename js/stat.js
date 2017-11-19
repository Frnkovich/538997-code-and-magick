'use strict';

var columnWidth = 40;
var columnSpacer = 50;
var hystogramHeight = 150;
var spacerHeight = 4;
var textHeight = 16;
var textX = 120;
var textY = 32;
var spaceLeft = 150;
var cloudX = 100;
var cloudY = 10;
var cloudWidth = 420;
var cloudHeight = 270;

window.renderStatistics = function (ctx, names, times){
  
  renderCloud(ctx);
  
  ctx.fillStyle = 'black';
  ctx.font = textHeight + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', textX, textY);
  ctx.fillText('Список результатов:', textX, textY + textHeight);

  renderHistogram(ctx, names, times);  
}

var setColor = function(name){
  var rand = Math.random();
  if (name == "Вы"){
    return 'rgba(255, 0, 0, 1)';
  }
  return 'rgba(0, 0, 255,' + rand + ')';
}

var maxResult = function(times){
  var max = times[0];
  for (var i = 0; i <= times.length; i++){
    if (max < times[i])  max = times[i];
  }
  return max;
}

var renderCloud = function(ctx){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(cloudX + 10, cloudY + 10, cloudWidth, cloudHeight);
  
  ctx.fillStyle = 'white';
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);
}

var renderHistogram = function(ctx, names, times){
  var bottomMargin= spacerHeight + 5 * textHeight  + hystogramHeight; 
  
  for(var i = 0; i<times.length; i++) {
    var columnHeight = times[i] / maxResult(times) * hystogramHeight;
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
