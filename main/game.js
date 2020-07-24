var timeLeft;
score = 0;

$('#btnEasy').on('click', function(){easy();});
$('#btnMedium').on('click', function(){medium();});
$('#btnHard').on('click', function(){hard();});

function easy(){
    $('.cntMenu').remove();

    letterCreate(50, true);
    timerStart(1,60,'2:00');
}

function medium(){
    $('.cntMenu').remove();

    letterCreate(40, true);
    timerStart(0,60,'1:00');
}

function hard(){
    $('.cntMenu').remove();

    letterCreate(30, true);
    timerStart(0,45,'0:45');
}