var buttonColors=["red", "blue", "green", "yellow"];
var wrong=new Audio("sounds/wrong.mp3");
var yellow=new Audio("sounds/yellow.mp3")
var green=new Audio("sounds/green.mp3")
var blue=new Audio("sounds/blue.mp3")
var red=new Audio("sounds/red.mp3");
var correct=new Audio("sounds/correct.mp3")
var level=0;
var gameSeq=[];
var userSeq=[];
function nextSequence()
{
  userSeq=[];
  level++;
  $("h1").text("Level "+level);
  var rndm=Math.floor(Math.random()*4);
  $("#"+buttonColors[rndm]).fadeIn(50).fadeOut(50).fadeIn(50);
  playSound(buttonColors[rndm]);
  gameSeq.push(buttonColors[rndm]);
  $("h2").text("Clicks required "+level);
}
function playSound(color)
{
  switch(color)
  {
    case "red":
    red.play();
    break;
    case "yellow":
    yellow.play();
    break;
    case "blue":
    blue.play();
    break;
    case "green":
    green.play();
    break;
    default:
    wrong.play();
    break;
}
}
$(".btn").on("click",function()
{
    var userChosenColor=this.id;
    userSeq.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
  check(userSeq.length-1);
  Counter();
});
function check(curLevel)
{

      if (gameSeq[curLevel] === userSeq[curLevel]) {
        console.log("success");
        if (userSeq.length == gameSeq.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }

      } else {
        error();
        console.log("wrong");

      }
}
function error(){
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");
  }, 200);
    $("h1").text("Game Over, Press any Key to restart");
    startOver();
}
function startOver(){
  gameSeq=[];
  userSeq=[];
  level=0;
}
function animatePress(currentColor)
{
  console.log("press engaged");
  $("#"+(currentColor)).addClass("pressed");
  setTimeout(function(){
      $("#"+(currentColor)).removeClass("pressed");
  }, 100);

}
function Counter()
{
  $("h2").text("Left "+ (gameSeq.length-userSeq.length));
  return;
}
var visible=true;
$("button").on("click",function(){
  if(visible==true)
  {
    visible=false;
    $("h2").css("visibility","hidden");
    $("button").text("Click me again for easy mode");
  }
  else
  {
    visible=true;
    $("h2").css("visibility","visible");
    $("button").text("Click me again to challenge yourself");
  }

});

$(document).keydown(function(event)
{
  $("#level-title").text("Level " + level);
  if(level==0)
  nextSequence();
})
