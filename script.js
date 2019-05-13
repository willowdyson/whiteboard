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

function letterDrop(item){
    elem = item;
    var runOnce = false;

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
                        //console.log(altCoords.top + " " + altCoords.left);
                        break;

                    case 1:
                        altCoords = altTopRight;
                        //console.log(altCoords.top + " " + altCoords.left);
                        break;

                    case 2:
                        altCoords = altBottomLeft;
                        //console.log(altCoords.top + " " + altCoords.left);
                        break;

                    case 3:
                        altCoords = altBottomRight;
                        //console.log(altCoords.top + " " + altCoords.left);
                        break;
                }
        
                if((elemCoords.top - ($(elem).outerHeight()/2)) - 100 < altCoords.top && altCoords.top < (elemCoords.top + ($(elem).outerHeight())/2)+ 100){
                    if((elemCoords.left - ($(elem).outerWidth())/2) - 100  < altCoords.left && altCoords.left < elemCoords.left){
                        if (runOnce == false){
                            var combinedHTML = "";
                        
                            combinedHTML += $(this).html() + ' ';
                            combinedHTML += $(elem).html();
                            var colourAvg = $.xcolor.average($(elem).css('background-color'),$(this).css('background-color'));
                            $(elem).css('background-color',colourAvg);
                            $(this).remove();
                            $(elem).html(combinedHTML);

                            runOnce = true;
                        }
                        
                    } else if(elemCoords.left < altCoords.left && altCoords.left < (elemCoords.left + ($(elem).outerWidth()/2)) + 100){
                        if (runOnce == false){
                            var combinedHTML = "";
        
                            combinedHTML += $(elem).html() + ' ';
                            combinedHTML += $(this).html();
                            var colourAvg = $.xcolor.average($(elem).css('background-color'),$(this).css('background-color'));
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
// delete element on drop on clear button

// change zindex on pickup and drop
// place deconstructed letters nearby eachother
// add size scaling?
// add movement?? panning?