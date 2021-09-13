var elem; // declared globally due to function passing issues
var fontSize;
var words;
var wordsAmt;
var points;
var timer, clock;


$(document).ready(function(){
    // Check the last word is loaded
    if(dict[zzz] !== true){
        loadDict();
    }
});

function letterMove(item){ // setting up the event listeners for mousemove on element click
    var elem = item;

    $(elem).css('z-index', 3000);
    $(document).off('mousemove'); // prevents eventlistener stacking
    $(document).on('mousemove', function(e){

    $(elem).css({top: e.pageY - 80, left: e.pageX - 80});
    // Collision Check with Page Border
    if(e.pageY < $(elem).outerHeight()){ // Top
        $(elem).css({top: -($(elem).outerHeight()/10)});
    } else if (e.pageY > $(window).height() - $(elem).outerHeight()){ // Bottom
        $(elem).css({top: $(window).height() - ($(elem).outerHeight() * 1.25)});
    }
    if (e.pageX < $(elem).outerWidth() / 2){ // Left
        $(elem).css({left: -($(elem).outerWidth()/10)});
    } else if (e.pageX > $(window).width() - $(elem).outerWidth()){ // Right
        $(elem).css({left: $(window).width() - ($(elem).outerWidth() * 1.25)});
    }
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
                    console.log("yes");
                    var borderColour = $.xcolor.lighten($(elem).css( "background-color" ));
                    $(elem).css({"text-decoration": "underline"});
                    $(elem).css({"border": "solid "+ borderColour +" 10px"});
                } else {
                    console.log("no");
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
    timer = $('#timer');
    $(timer).html(time);

    clock = setInterval(function() {
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