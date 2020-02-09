$('#btnPlayAgain').on('click', function(){window.location.href ="game.html";});
$('#btnMenu').on('click', function(){window.location.href ="../menu.html";});

$(document).onload = end();

function end(){
    var score = localStorage.getItem("score");
    var points = localStorage.getItem("points");
    $('#optScore').text("You created " + score + " words, for " + points + " points");
}