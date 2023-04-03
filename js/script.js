var x = document.getElementById("runner");
var start = 0;


// running Image Number
var r = 1;
//Worker for stop  multiple pressing
var w = 0;
var runS = new Audio("audio/run.mp3");
runS.loop = true;


//Jumping
var jumpI = 1;
//JUmp worker
jumpW = 0;


//Slidding
var slideI = 1;
//Slide worker
var slideW = 0;


//Background for playing ground
var backgroundG =  document.getElementById("playing-game");
var backgroundX = 0;
var backgroundW = 0;

//Score Board
var score = document.getElementById("score");
var scoreValue = 000;
var scoreW = 0;
 
//
var ml = 75;
var obsId = 1;
var obsW = 0;
var moveobsW = 0;

// When click start button hide welcome div
function start_btn() {
    document.getElementById("welcome_page").style.display = "none";
    showCharacter();
    

}
// When click start button show playing-game div div
function showCharacter() {
    // create the img sprite element
    document.getElementById("playing-game").style.display = "block";
    setTimeout(function() {
        document.getElementById("insturction").style.display = "none";
    }, 4000);

      
}

//Running
function keycheck(event) {
    if (event.which == 13) {
        document.getElementById("welcome_page").style.display = "none";
        start_btn();
        var audio = new Audio('audio/start.mp3');
        audio.volume = 0.1;
        //audio.play();
            
        if (w == 0) {
            w = setInterval(run, 100);
            backgroundW = setInterval(moveBackground, 15);
            obsW = setInterval(create, 1000);
            scoreW = setInterval(updateScore, 50);
            moveobsW = setInterval(moveObstacle, 30);
            start = 1;
            runS.play();
        }
        
        
    }
    if (event.which == 32 | event.which == 38) {

        if (start == 1) {
            if (scoreW == 0) {
                scoreW = setInterval(updateScore, 50);
                
            }
            //Jump
            if (jumpW == 0) {
                runS.pause();
                clearInterval(w);
                jumpW = setInterval(jump, 125);
                
            }
        }
        
    }
    if (event.which == 40) {
        if (start == 1) {
        
            if (scoreW == 0) {
                scoreW = setInterval(updateScore, 50)
            }
            //Slide
            if (slideW == 0) {
                runS.pause();
                clearInterval(w);
                slideW = setInterval(slide, 100);

            }
        }
    }
}


// Restart game
function restart() {
    location.reload();
}

//function for run
function run() {
    r = r+1;
    if (r ==  9 ) {
        r=1
        // const audio = new Audio('audio/running.wav');
        // audio.play();
    }
    x.src="images/pumpkinhead/Run ("+r+").png";
   
}
var fuping = 79;
//fuction for jump
function jump() {
    
    jumpI = jumpI+1;
    if (jumpI == 2) {
        const audio = new Audio('audio/jump.mp3');
        audio.play();
    }
    if (jumpI <= 6) {
        fuping = fuping + 25;
        x.style.marginBottom = fuping+"px";
        
    }
    if (jumpI >= 7) {
        fuping = fuping - 25;
        x.style.marginBottom = fuping + "px";
    }
    if (jumpI == 11) {
        jumpI = 1;
        
        clearInterval(jumpW);
        w = setInterval(run, 100);
        runS.play();
        //Rewrite jumpW
        jumpW = 0;

        //Background moving
        if (backgroundW == 0) {
            backgroundW = setInterval(moveBackground, 10);
            obsW = setInterval(moveObstacle, 25);
            
        }
        
    }

    x.src="images/pumpkinhead/Jump ("+jumpI+").png";
    
    
}

//function for slide
function slide() {
    slideI = slideI+1;
    if (slideI == 6) {
        slideI = 1;
        clearInterval(slideW);
        w = setInterval(run, 100);
        runS.play();
        
        //Rewrite slideW
        slideW = 0;

        //Background moving
        if (backgroundW == 0) {
            backgroundW = setInterval(moveBackground, 10);
            obsW = setInterval(moveObstacle, 25);
        }
    }
    x.src = "images/pumpkinhead/Slide ("+slideI+").png";
}


//Moving Background
function moveBackground() {
    backgroundX = backgroundX - 5;
    backgroundG.style.backgroundPositionX = backgroundX + "px";
    
}

//Score Board
function updateScore() {
    scoreValue = scoreValue + 001;
    score.innerHTML = "Score: " + scoreValue;
}



//Create Obstacles
function create() {
        var createObstacle = document.createElement("img");
        createObstacle.src = "images/fire.png";
        createObstacle.className = "obstacle";
        createObstacle.id = "obstacle" + obsId;
        obsId = obsId + 1;
        // createObstacle.style.marginLeft = ml + "%";
        // ml = ml + 50;
        var gap = Math.random() *(50-10)+20;
        ml = ml + gap;
        createObstacle.style.marginLeft = ml + "%";
        var parent = document.getElementById("playing-game");
        parent.appendChild(createObstacle);
}
function moveObstacle() {
    var runnerRect = x.getBoundingClientRect();
    for (var j = 1; j <= obsId; j++) {
        var moveObs = document.getElementById("obstacle" + j);
        var r = moveObs.style.marginLeft;
        r = parseInt(r)-1;
        moveObs.style.marginLeft = r + "%";
        var obs = document.getElementById("obstacle" + j);
      var obsRect = obs.getBoundingClientRect();
      if (runnerRect.bottom >= obsRect.top &&
          runnerRect.top <= obsRect.bottom &&
          runnerRect.right >= obsRect.left &&
          runnerRect.left <= obsRect.right) {
        // Collision detected
        gameOver();
        
      }
    }
}


function detectCollision() {

}

var deadI = 1;
var deadW = 0;
// Game over function
function gameOver() {
    clearInterval(w);
    clearInterval(backgroundW);
    clearInterval(slideW);
    slideW = -1;
    clearInterval(jumpW);
    jumpW = -1;
    clearInterval(scoreW);
    clearInterval(obsW);
    clearInterval(moveobsW);
    if (deadW === 0) {
        deadW = setInterval(dead, 100);
        const audio = new Audio('audio/game end.wav');
        audio.play();
    }
    document.getElementById("result").style.display ="block";
    document.getElementById("reScore").innerHTML = scoreValue ;
    runS.pause();
}


//function dead
function dead() {
    deadI = deadI+1;
    if (deadI == 10 ) {
        clearInterval(deadW);

    }
    x.src="images/pumpkinhead/Dead ("+deadI+").png";
    x.style.marginBottom = "79px";

}

// // Background sounds
const audioB = new Audio('audio/background.mp3');
audioB.loop = true;
audioB.volume = 0.7;
audioB.play();
