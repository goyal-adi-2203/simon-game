const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

let started = false;
let level = 0;


$(document).on("keyup", function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
}

function makeSound(key){
    var audio = new Audio("./sounds/" + key + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
