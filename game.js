var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(".btn").on("click", function(event){
    
    var userChoseColor = event.target.id;
    userClickedPattern.push(userChoseColor);
    playSound(userChoseColor);
    animatePress(userChoseColor);
    checkAnswer(userClickedPattern.length - 1);
    
});

function nextSequence(){
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

function playSound(name) {
    var audioLink = "./sounds/"+ name + ".mp3";
    var audio = new Audio(audioLink);
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).on("keypress", function(event){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length ) {
            setTimeout(nextSequence(), 1000);
            userClickedPattern = [];
        }    
        
    } else {
        console.log("wrong");
        var audio1 = new Audio("./sounds/wrong.mp3");
        audio1.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();

    }
}


function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}