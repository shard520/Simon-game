var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

// start the game when user presses a key or clicks h1
$(document).keydown(function(){
  startGame();
});
$("#level-title").click(function(){
  startGame();
});

// game start conditions
function startGame(){
  if (level === 0){
    $("#level-title").text("Level " + level);
    nextSequence();
  };
}

// update userClickedPattern with each button click
// play sound, flash button, then compare answer to gamePattern
$(".btn").click(function(){
  userClickedPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

// Add a random button to gamePattern and update level display
// flash and play latest button
function nextSequence(){
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  ++level;
  $("#level-title").text("Level " + level);

  $("#" + randomChosenColour).fadeOut(50, "linear").fadeIn(50, "linear");

  playSound(randomChosenColour);

};

function playSound(name){
  var btnSound = new Audio("sounds/" + name + ".mp3");
  btnSound.play();
};

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

// check if current answer matches same position in gamePattern array
// if true and array lengths match then call nextSequence after 1 second
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){nextSequence()}, 1000);
    };
  }
    else {
      console.log("wrong");
      gameOver();
    };
};

function gameOver(){
  playSound("wrong");

  $("#level-title").text("Game Over, Press Any Key Or Click Here To Restart");

  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  startOver();
};

function startOver(){
  level = 0;
  gamePattern = [];
};
