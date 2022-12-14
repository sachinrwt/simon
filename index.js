
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var currentscore = 0
var highscore = 0

var started = false;
var level = 0;

function togglePopup() {
            $(".content").toggle();
        }

$(".start").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(".start").text("Restart");
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Restart to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      scoreboard();
      startOver();

    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  currentscore++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  for (let i = 0; i < gamePattern.length; i++) {
    
    (function(i){

      window.setTimeout(function(){
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
      }, i * 800);
  
    }(i));
    }
  // playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  currentscore = 0;
  gamePattern = [];
  started = false;
}
function scoreboard() {

  if (currentscore > highscore){
    $("#high-score").text("High Score = "+ currentscore);
    highscore = currentscore;
  }else{
    $("#high-score").text("High Score = "+ highscore);
  }

}
