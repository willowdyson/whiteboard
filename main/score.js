$('#btnPlayAgain').on('click', function(){window.location.href ="game.html";});
$('#btnMenu').on('click', function(){window.location.href ="../index.html";});

$(document).onload = end();

function end(){
    var score = localStorage.getItem("score");
    var points = localStorage.getItem("points");
    var words = localStorage.getItem("words");
    $('#optScore').text("You created " + score + " words, " + points + " points");
}