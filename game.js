
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var clickedPattern = [];

var started = false;
var level = 1;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        generateSequence();
        started = true;
    }
});
$(".game-interact").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        generateSequence();
        started = true;
    }
});

$(".btn").click(function () {
    if (started) {
        var clickedColour = $(this).attr("id");
        clickedPattern.push(clickedColour);

        playSound(clickedColour);
        animatePress(clickedColour);

        checkPattern(clickedPattern.length - 1);
    }
})

function checkPattern(inputIndex) {
    var match = gamePattern[inputIndex] === clickedPattern[inputIndex];
    if (match) {
        if (inputIndex !== level - 1)
            return;
        else {
            setTimeout(function () {
                level++;
                gamePattern = [];
                clickedPattern = [];
                $("#level-title").text("Level " + level);
            }, 300);
            setTimeout(function () {
                generateSequence();
            }, 750);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key or Click Here to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function generateSequence() {
    var randomNumber;
    var randomColour;
    for (var i = 0; i < level; i++) {
        setTimeout(function () {
            randomNumber = Math.floor(Math.random() * 4);
            randomColour = buttonColours[randomNumber];
            gamePattern.push(randomColour);
            $('#' + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(randomColour);
        }, i * 450);
    }
}

function playSound(colour) {
    var audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(colour) {
    $('#' + colour).addClass("pressed");
    setTimeout(function () {
        $("#" + colour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 1;
    gamePattern = [];
    clickedPattern = [];
    started = false;
}