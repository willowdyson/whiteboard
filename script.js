var elem; // declared globally due to function passing issues
var fontSize = 60;
var score;
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

    if(window.location.href == 'file:///C:/Users/treed/Desktop/Projects/whiteboard/main/freeplay.html'){
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

function timerStart(mins,secs,time){
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
                score = 0;
                points = 0;
                clearInterval(clock);
                gameOver();
            } else {
                secs = 60;
            }
        }
    }, 1000);
}

function gameOver(){
    $('.letter').each(function(){
        elem = $(this).text();
        if(elem.length > 1){
            ++score;
        }
    });

    localStorage.setItem("score",score);
    localStorage.setItem("points",points);
    window.location.href ="score.html";
}