var buttonColours = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var correctPattern = true;

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber*4);
  var randomButtonColor = buttonColours[randomNumber];

  $("#"+randomButtonColor).fadeIn(200).fadeOut(200).fadeIn(200);

  playSound(randomButtonColor);

  gamePattern.push(randomButtonColor);
}

$(".btn").on("click", function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});

function playSound(str){
  var audio = new Audio("sounds/"+str+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100)
}

$(document).on("keydown",function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(i){
    if(gamePattern[i] === userClickedPattern[i]){
      console.log("Success");

      if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    }
    else{
      console.log("wrong");

      playSound("wrong");
      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      startover();
   }

};

function startover(){
    started = false;
    level = 0;
    gamePattern = [];
  };
