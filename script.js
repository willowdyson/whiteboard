var elem; // declared globally due to function passing issues

$(document).onload = letterCreate(7, true); // 8 starter letters
$(document).keypress(function(e) {
    letterCreate(0,false,e.key);
});
$('#shuffle').on('click', function(){letterCreate(0,true)});
$('#clear').on('click', function(){letterClear()});

function letterMove(item){ // setting up the event listeners for mousemove on element click
    var elem = item
    $(document).off('mousemove'); // prevents eventlistener stacking
    $(document).on('mousemove', function(e){
        $(elem).css({top: (e.pageY - 80), left: e.pageX - 80});
    });
    $(document).on('mouseup', function(){
        $(document).off('mousemove');
        $(document).off('mouseup');

        letterDrop(item);
    })
}

function letterDrop(item){ // when letter put down, testing if other elements are nearby, and combining them

    elem = item;

    // Test if close to other elements

    $('.letter').each(function(i){
        if (elem != $('.letter')[i]){
            var elemCoords = $(elem).position();
            elemCoords.top += $(elem).outerHeight() / 2;
            elemCoords.left += $(elem).outerWidth() / 2;

            var compareElem = $('.letter')[i];
            if (typeof compareElem !== 'undefined'){
                var compareElemCoords = $(compareElem).position();

                compareElemCoords.top += $(compareElem).outerHeight() / 2;
                compareElemCoords.left += $(compareElem).outerWidth() / 2;

                if(compareElemCoords.top >= elemCoords.top - (($(elem).outerHeight() / 2) + 100) && compareElemCoords.top <= elemCoords.top + (($(elem).outerHeight() / 2) + 100)){
                    if(compareElemCoords.left >= elemCoords.left - (($(elem).outerWidth() / 2) + 100) && compareElemCoords.left <= elemCoords.left){

                        var combinedHTML = "";
                        
                        combinedHTML += $(compareElem).html() + ' ';
                        combinedHTML += $(elem).html();
                        var colourAvg = $.xcolor.average($(elem).css('background-color'),$(compareElem).css('background-color'));
                        $(elem).css('background-color',colourAvg);
                        $(compareElem).remove();
                        $(elem).html(combinedHTML);
                        
                    } else if (compareElemCoords.left <= elemCoords.left + (($(elem).outerWidth() / 2) + 100) && compareElemCoords.left >= elemCoords.left){
                        var combinedHTML = "";
    
                        combinedHTML += $(elem).html() + ' ';
                        combinedHTML += $(compareElem).html();
                        var colourAvg = $.xcolor.average($(elem).css('background-color'),$(compareElem).css('background-color'));
                        $(elem).css('background-color',colourAvg);
                        $(compareElem).remove();
                        $(elem).html(combinedHTML);
                    }
                }
            }
        } 
    });
}

function letterCreate(count, randBool, char){ // function to create letters randomly or from a given letter

    if (randBool == true) {
        var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','a','b','c','d','e','e','f','g','h','i','i','k','l','m','n','o','o','p','r','s','t','u','u','y'];
    
        for (f = 0; f <= count; f++){
            $('#background').append('<div class="letter" id="selected"></div>');
            var newLetter = $('#selected');

            var randAlphabet = Math.floor(Math.random() * 50);
            var randHex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

            $(newLetter).html(alphabet[randAlphabet]);
            $(newLetter).css('background-color',randHex);

            $(newLetter).on('mousedown', function(e){letterMove(e.target)});
            $(newLetter).on('dblclick', function(e){letterSplit(e.target)});

            $(newLetter).removeAttr('id');
            randPlacement(newLetter);
        }
    } else if (randBool == false){
        $('#background').append('<div class="letter" id="selected"></div>');
        var newLetter = $('#selected');
        var randHex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

        $(newLetter).html(char);
        $(newLetter).css('background-color',randHex);

        $(newLetter).on('mousedown', function(e){letterMove(e.target)});
        $(newLetter).on('dblclick', function(e){letterSplit(e.target)});

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
    var randHeight = Math.floor(Math.random() * $(window).height());
    var randWidth = Math.floor(Math.random() * $(window).width());
    $(element).css({top: randHeight, left: randWidth});
}

function letterClear(){
    $('.letter').each(function(){
        $(this).remove();
    });
}

// TODO
// improve box collision detecting
// add limitations to prevent going off the edges or touching other boxes

// change zindex on pickup and drop
// add ui buttons at bottom e.i clear
// place deconstructed letters nearby eachother