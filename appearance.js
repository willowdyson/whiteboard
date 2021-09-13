function mouseReady(){
    var mouseX = 0, mouseY = 0;
    var xp = 0, yp = 0;
     
    $(document).mousemove(function(e){
      mouseX = e.pageX - ($(".cursor").width() / 2);
      mouseY = e.pageY - ($(".cursor").width() / 2);
      $(".cursor").css({opacity:0.1});
    });
      
    setInterval(function(){
      xp += ((mouseX - xp)/6);
      yp += ((mouseY - yp)/6);
      $(".cursor").css({left: xp +'px', top: yp +'px'});
    }, 20);

    movingBg();
}

function movingBg(){

    var circleAmt = (Math.floor(Math.random() * 5) + 15);
    
    for (i=0;i<circleAmt;i++){
        $('body').append('<div class="bgCircle" id="selected"></div>');
        var size = (Math.floor(Math.random() * 120) + 150);
        switch(Math.floor(Math.random() * 2)){
            case 0:
                colour = "rgb(139, 153, 231)";
                break;
            case 1:
                colour = "rgb(187, 139, 231)";
                break;
        }
        $("#selected").css({width: size, height: size, backgroundColor: colour});
        var coordTop = (Math.floor(Math.random() * ($(document).height() - ($("#selected").height() * 1.5))));
        var coordLeft = (Math.floor(Math.random() * ($(document).width() - $("#selected").width())));

        $("#selected").css({top: coordTop, left: coordLeft});

        var curElem = document.getElementById("selected");
        $("#selected").removeAttr('id');
        hitEdge(curElem);
    }
}

function hitEdge(elem){
    $(elem).attr('id', 'selected'); 
    var side = Math.floor(Math.random() * 4);
    var aimTop, aimLeft;

    if($("#selected").position().top == 20 && side == 0){
        side++;
    } else if($("#selected").position().top == ($(document).height() - $("#selected").width() - 20) && side == 1){
        side++;
    } else if($("#selected").position().left == 25 && side == 2){
        side++;
    } else if($("#selected").position().left == ($(document).width() - $("#selected").width() - 25) && side == 3){
        side = 0;
    }

    switch (side){
        case 0:
            aimTop = 20; // top
            aimLeft = (Math.floor(Math.random() * ($(document).width() - $("#selected").width())));
            break;
        case 1:
            aimTop = $(document).height() - $("#selected").width() - 20; // btm
            aimLeft = (Math.floor(Math.random() * ($(document).width() - $("#selected").width())));
            break;
        case 2:
            aimLeft = 25; // left
            aimTop = (Math.floor(Math.random() * ($(document).height() - ($("#selected").height() * 1.5))));
            break;
        case 3:
            aimLeft = $(document).width() - $("#selected").width() - 25; // right
            aimTop = (Math.floor(Math.random() * ($(document).height() - ($("#selected").height() * 1.5))));
            break;
    }

    var speed = calcDistance($("#selected").position().left,$("#selected").position().top,aimLeft,aimTop);
    speed *= 5;

    $("#selected").animate({
        top:aimTop,
        left:aimLeft
    },{duration: speed, complete: function(){hitEdge(this);}});
    $("#selected").removeAttr('id');
}

function calcDistance(x1,y1,x2,y2){
    var distance;
    distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    return distance;
}

// Buttons

// BG shapes
$("#bgSwitch").click(function(){
    if(this.checked){
        $(".bgCircle").stop();
        localStorage.setItem("bg","stop");
    } else {
        $(".bgCircle").each(function(){
            hitEdge(this);
        });
        localStorage.setItem("bg","start");
    }
});

// Dark Theme

$("#darkSwitch").change(function(){
    darkTheme();
    if(this.checked){
        $("body").attr("data-theme","dark");
        $("#moon").animate({opacity:0},200);
        $("#rays").animate({opacity:1},1000);
        $(".cursor").css({background:"white"});
        localStorage.setItem("theme","dark");
    } else {
        $("body").attr("data-theme","light");
        $("#moon").animate({opacity:1},1000);
        $("#rays").animate({opacity:0},200);
        $(".cursor").css({background:"red"});
        localStorage.setItem("theme","light");
    }
  });
  
function darkTheme(){
$(document).addClass("transition");
    window.setTimeout(() => {
    $(document).removeClass("transition");
    }, 1000);
}

// Saving Darktheme // Lightheme

$(document).ready(function(){
    if (localStorage.getItem("theme") === null) {
        localStorage.setItem("theme","light");
    } else if(localStorage.getItem("theme") == "dark"){
        $("body").attr("data-theme","dark");
        $(".cursor").css({background:"white"});
        $("#darkSwitch").prop("checked", true);
    } else {
        $("body").attr("data-theme","light");
    }

    if (localStorage.getItem("bg") === null) {
        localStorage.setItem("bg","start");
    } else if(localStorage.getItem("bg") == "stop"){
        $("#bgSwitch").prop("checked", true);
        setTimeout(() => {
            $(".bgCircle").stop();
        }, 10);
        
    }

    if (localStorage.getItem("fSize") === null) {
        localStorage.setItem("fSize",60);
        fontSize = 60;
    } else {
        fontSize = localStorage.getItem("fSize");
    }
});