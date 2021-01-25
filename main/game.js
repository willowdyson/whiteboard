var timeLeft;
score = 0;

$('#btnEasy').on('click', function(){easy();});
$('#btnMedium').on('click', function(){medium();});
$('#btnHard').on('click', function(){hard();});

if(localStorage.getItem("fSize") == 40){
    $("#scaleSelect").css({left:"-4%"});
} else if(localStorage.getItem("fSize") == 60){
    $("#scaleSelect").css({left:"47%"});
} else if(localStorage.getItem("fSize") == 100){
    $("#scaleSelect").css({left:"98%"});
}

function easy(){
    $('.cntMenu').remove();
    $("#btnPause").css({display:"block"});

    letterCreate(50, true);
    timerStart(1,60,'2:00');
}

function medium(){
    $('.cntMenu').remove();
    $("#btnPause").css({display:"block"});

    letterCreate(40, true);
    timerStart(0,60,'1:00');
}

function hard(){
    $('.cntMenu').remove();
    $("#btnPause").css({display:"block"});

    letterCreate(30, true);
    timerStart(0,45,'0:45');
}

$("#btnPause").click(function(){
    //pause
    if($(".overlay").css("display") == "none"){
        // Save time left
        timeLeft = $(timer).html().split(":");
        timeLeft[2]=$(timer).html();
        clearInterval(clock);

        // Show pause menu
        $(".overlay").css({display:"block"});
        $(".menu").css({display:"flex"});
        $(".letter").css({display:"none"});
    } else {
        // resume

        // Resume timer
        timerStart(timeLeft[0],timeLeft[1],timeLeft[2]);

        // Show game
        $(".overlay").css({display:"none"});
        $(".menu").css({display:"none"});
        $(".letter").css({display:"block"});
    }
});


// Size Scale

var scaleMouseDown = false;
$("#scaleSelect").mousedown(function(e){
  scaleMouseDown = true;
});

$(document).mouseup(function(e){
  scaleMouseDown = false;
});


$(document).mousemove(function(e){
  if(scaleMouseDown == true){
    mousePos = e.pageX;
    var position = "none";
    
    if(mousePos < $("#scaleMid").offset().left){
      position = "left";
    } else if (mousePos < ($("#scaleMid").offset().left) + $("#scaleMid").outerWidth()) {
      position = "mid";
    } else if (mousePos > ($("#scaleMid").offset().left) + $("#scaleMid").outerWidth()) {
      position = "right";
    }
    
    
    switch(position){
      case "left":
        $("#scaleSelect").css({left:"-4%"});
        $(".letter").css({fontSize:"40px"});
        localStorage.setItem("fSize",40);
        fontSize = 40;
        break;
        
      case "mid":
        $("#scaleSelect").css({left:"47%"});
        $(".letter").css({fontSize:"60px"});
        localStorage.setItem("fSize",60);
        fontSize = 60;
        break;
        
      case "right":
        $("#scaleSelect").css({left:"98%"});
        $(".letter").css({fontSize:"100px"});
        localStorage.setItem("fSize",100);
        fontSize = 100;
        break;
    }
  }
});