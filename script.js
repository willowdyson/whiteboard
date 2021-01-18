var elem; // declared globally due to function passing issues
var fontSize = 60;
var words;
var wordsAmt;
var points;

function letterMove(item){ // setting up the event listeners for mousemove on element click
    var elem = item;

    $(elem).css('z-index', 3000);
    $(document).off('mousemove'); // prevents eventlistener stacking
    $(document).on('mousemove', function(e){
        $(elem).css({top: (e.pageY - 80), left: e.pageX - 80});
    });
    $(document).on('mouseup', function(){
        $(document).off('mousemove');
        $(document).off('mouseup');

        letterDrop(item);
    });
}

function isCollide(elem1, elem2) {

    var a = {
        height : $(elem1).outerHeight(),
        width : $(elem1).outerWidth(),
        y : $(elem1).position().top,
        x : $(elem1).position().left
    };

    var b = {
        height : $(elem2).outerHeight(),
        width : $(elem2).outerWidth(),
        y : $(elem2).position().top,
        x : $(elem2).position().left
    };

    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function letterDrop(item){
    elem = item;
    var runOnce = false;

    if(window.location.href == 'main/freeplay.html'){
        $(elem).css('z-index', 1);
        var clearTopLeft = $('#clear').position();
        var clearBtmRight = $('#clear').position();
        clearBtmRight.top += $('#clear').outerHeight();
        clearBtmRight.left += $('#clear').outerWidth();

        var elemCoords = $(elem).position();
        elemCoords.top += $(elem).outerHeight() / 2;
        elemCoords.left += $(elem).outerWidth() / 2;

        // check if on clear button before merging
        if((clearTopLeft.top < elemCoords.top && elemCoords.top < clearBtmRight.top) && (clearTopLeft.left < elemCoords.left && elemCoords.left < clearBtmRight.left)){
            $(elem).remove();
            return;
        }
    }
    

    $('.letter').each(function(){
        if (elem != this){
            
            if (isCollide(elem,this)){
                if ($(elem).position().left < ($(this).position().left + ($(this).outerWidth()/2))){
                    if (runOnce == false){
                        combinedHTML = "";
                        
                        combinedHTML += $(elem).html() + ' ';
                        combinedHTML += $(this).html();
                        colourAvg = $.xcolor.average($(elem).css('background-color'),$(this).css('background-color'));
                        $(elem).css('background-color',colourAvg);
                        $(this).remove();
                        $(elem).html(combinedHTML);

                        runOnce = true;
                    }
                } else {
                    if (runOnce == false){
                        combinedHTML = "";
                    
                        combinedHTML += $(this).html() + ' ';
                        combinedHTML += $(elem).html();
                        colourAvg = $.xcolor.average($(elem).css('background-color'),$(this).css('background-color'));
                        $(elem).css('background-color',colourAvg);
                        $(this).remove();
                        $(elem).html(combinedHTML);

                        runOnce = true;
                    }
                }
                if(valWord(combinedHTML.replace(/\s/g, ''))){
                    var borderColour = $.xcolor.lighten($(elem).css( "background-color" ));
                    $(elem).css({"text-decoration": "underline"});
                    $(elem).css({"border": "solid "+ borderColour +" 10px"});
                } else {
                    $(elem).css({"border": "none"});
                    $(elem).css({"text-decoration": "none"});
                }
            }
        }
    });
}

function letterCreate(count, randBool, char){ // function to create letters randomly or from a given letter

    var newLetter,randHex;

    if (randBool == true) {
        var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','a','b','c','d','a','a','e','e','i','i','o','o','u','u',
        'e','e','f','g','h','i','i','k','l','m','n','o','o','p','r','s','t','u','u','y','a','a','b','c','d','e','e','f','g','h','i','i','k','l','m','n','o','o','p','r','s','t','u','u','y'];
    
        for (f = 0; f <= count; f++){
            $('body').append('<div class="letter" id="selected"></div>');
            newLetter = $('#selected');

            randAlphabet = Math.floor(Math.random() * 50);
            randHex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

            $(newLetter).html(alphabet[randAlphabet]);
            $(newLetter).css('background-color',randHex);
            $(newLetter).css('font-size',fontSize);
            $(newLetter).css('height','auto');
            $(newLetter).css('width','auto');

            $(newLetter).on('mousedown', function(e){letterMove(e.target);});
            $(newLetter).on('dblclick', function(e){letterSplit(e.target);});

            $(newLetter).removeAttr('id');
            randPlacement(newLetter);
        }
    } else if (randBool == false){
        $('body').append('<div class="letter" id="selected"></div>');
        newLetter = $('#selected');
        randHex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

        $(newLetter).html(char);
        $(newLetter).css('background-color',randHex);
        $(newLetter).css('font-size',fontSize);

        $(newLetter).on('mousedown', function(e){letterMove(e.target);});
        $(newLetter).on('dblclick', function(e){letterSplit(e.target);});

        $(newLetter).removeAttr('id');
        randPlacement(newLetter);
    }
}

function letterSplit(item){ // dissassembles words on doubleclick
    elem = item;

    var elemText = $(elem).text();

    if (elemText.length > 1){
        for(i=0;i<=(elemText.length - 1);i++){
            if (elemText.charAt(i) != ' '){
                letterCreate(0,false,elemText.charAt(i));
            }
        }
        $(elem).remove();
    }
}

function randPlacement(element){ // places all elements randomly on the page
    var randHeight = Math.floor(Math.random() * ($(window).height() - 175));
    var randWidth = Math.floor(Math.random() * ($(window).width() - 185));
    $(element).css({top: randHeight +15, left: randWidth+15});
}

function letterClear(){
    $('.letter').each(function(){
        $(this).remove();
    });
}

function timerStart(mins,secs,time){ // gameplay timer, depending on the passed variables to set time
    $('body').append('<div class="head" id="timer"></div>');
    var timer = $('#timer');
    $(timer).html(time);

    var clock = setInterval(function() {
        -- secs;

        if(secs.toString().length == 1) { secs = '0' + secs;}
        $(timer).html(mins + ":" + secs);
        
        if (secs==0){
            --mins;
            if (mins==-1){
                wordsAmt = 0;
                points = 0;
                words = [];
                clearInterval(clock);
                gameOver();
            } else {
                secs = 60;
            }
        }
    }, 1000);
}

function gameOver(){ // count up the players points
    $('.letter').each(function() {
        if($(this).css("text-decoration").includes("underline")){
            elem = $(this).text().replace(/\s/g, '');
            words.push(elem);
            wordsAmt++;

            points += (elem.length * ((elem.length + 1) / 2));
        }
    });

    localStorage.setItem("score",wordsAmt);
    localStorage.setItem("points",points);
    localStorage.setItem("words",words);
    window.location.href ="score.html";
}

// Library Lookup

var dict = {};

function loadDict(){
    $.get( "../assets/en.txt", function( txt ) {
        words = txt.split( "\n" );
        for ( var i = 0; i < words.length; i++ ) {
            if(words[i].length > 2){
                dict[words[i]] = true;
            }
        }
    });
}

function valWord(word){
    return(dict[word]);
}

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
    } else {
        $(".bgCircle").each(function(){
            hitEdge(this);
        });
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
    } else {
        $("body").attr("data-theme","light");
        $("#moon").animate({opacity:1},1000);
        $("#rays").animate({opacity:0},200);
        $(".cursor").css({background:"red"});
    }
  });
  
  function darkTheme(){
    $(document).addClass("transition");
     window.setTimeout(() => {
       $(document).removeClass("transition");
     }, 1000);
  }