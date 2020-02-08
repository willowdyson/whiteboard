var timeLeft;
score = 0;

// on timer end -> count up points -> send to victory screen
// on pause button -> hide letters, pause timer -> show pause button

// hard -> no word disbanding

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
    timerStart(0,5,'0:45');
}

function gameOver(){
    
    $('.letter').each(function(){
        elem = $(this).text();
        if(elem.length > 1){
            console.log(elem);
            ++score;
        }
    });

    window.location.href ="score.html";
}