var timeLeft;

// step two : create the letters and timer
// step three : start the timer

// on timer end -> count up points -> send to victory screen
// on pause button -> hide letters, pause timer -> show pause button

// diferences between easy, medium and hard:
// easy: 2 mins. 50 letters?
// medium: 1 min. 40 letters?
// hard: 30 seconds: 30 letters? no word disbanding

$('#btnEasy').on('click', function(){easy();});
$('#btnMedium').on('click', function(){medium();});
$('#btnHard').on('click', function(){hard();});

function easy(){
    $('#cntMode').remove();

    letterCreate(50, true);
    timerStart(1,60,'2:00');
}

function medium(){
    $('#cntMode').remove();

    letterCreate(40, true);
    timerStart(0,60,'1:00');
}

function hard(){
    $('#cntMode').remove();

    letterCreate(30, true);
    timerStart(0,30,'0:30');
}

function gameOver(){
    
}