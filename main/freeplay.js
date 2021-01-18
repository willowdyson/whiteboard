$(document).onload = letterCreate(20, true); // starter letters
$(document).keypress(function(e) {
    if (e.key != " "){
       letterCreate(0,false,e.key); 
    }
});

$('#shuffle').on('click', function(){letterCreate(0,true);});
$('#clear').on('click', function(){letterClear();});
$('#larger').on('click', function(){if(fontSize < 300){fontSize += 40;}});
$('#smaller').on('click', function(){if(fontSize > 60)fontSize -= 40;});

$('img').on('dragstart', function(event) { event.preventDefault(); }); // stop img dragging (ugly)