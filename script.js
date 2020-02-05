var elem; // declared globally due to function passing issues
var fontSize = 100;

$(document).onload = letterCreate(7, true); // 8 starter letters
$(document).keypress(function(e) {
    letterCreate(0,false,e.key);
});
$('#shuffle').on('click', function(){letterCreate(0,true);});
$('#clear').on('click', function(){letterClear();});
$('#larger').on('click', function(){fontSize += 40;});
$('#smaller').on('click', function(){fontSize -= 40;});

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

function letterDrop(item){
    elem = item;
    var runOnce = false;

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

    $('.letter').each(function(){
        if (elem != this){
            // get center of dropped element
            var elemCoords = $(elem).position();
            elemCoords.top += $(elem).outerHeight() / 2;
            elemCoords.left += $(elem).outerWidth() / 2;

            // get corners of other element
            var altTopLeft = $(this).position();

            var altTopRight = $(this).position();
            altTopRight.left += $(this).outerWidth();

            var altBottomLeft = $(this).position();
            altBottomLeft.top += $(this).outerHeight();

            var altBottomRight = $(this).position();
            altBottomRight.left += $(this).outerWidth();
            altBottomRight.top += $(this).outerHeight();
            
            // check if corner is within boundary
            for (i=0;i<4;i++){
                var altCoords;
                switch (i){
                    case 0:
                        altCoords = altTopLeft;
                        break;

                    case 1:
                        altCoords = altTopRight;
                        break;

                    case 2:
                        altCoords = altBottomLeft;
                        break;

                    case 3:
                        altCoords = altBottomRight;
                        break;
                }
                
                var combinedHTML, colourAvg;

                if((elemCoords.top - ($(elem).outerHeight()/2)) - 100 < altCoords.top && altCoords.top < (elemCoords.top + ($(elem).outerHeight())/2)+ 100){
                    if((elemCoords.left - ($(elem).outerWidth())/2) - 100  < altCoords.left && altCoords.left < elemCoords.left){
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
                        
                    } else if(elemCoords.left < altCoords.left && altCoords.left < (elemCoords.left + ($(elem).outerWidth()/2)) + 100){
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
                    }
                }
            }
        }
    });
}

function letterCreate(count, randBool, char){ // function to create letters randomly or from a given letter

    var newLetter,randHex;

    if (randBool == true) {
        var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','a','b','c','d','e','e','f','g','h','i','i','k','l','m','n','o','o','p','r','s','t','u','u','y'];
    
        for (f = 0; f <= count; f++){
            $('body').append('<div class="letter" id="selected"></div>');
            newLetter = $('#selected');

            randAlphabet = Math.floor(Math.random() * 50);
            randHex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

            $(newLetter).html(alphabet[randAlphabet]);
            $(newLetter).css('background-color',randHex);
            $(newLetter).css('font-size',fontSize);

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