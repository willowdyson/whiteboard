$('#btnPlayAgain').on('click', function(){window.location.href ="game.html";});
$('#btnMenu').on('click', function(){window.location.href ="../menu.html";});

$(document).onload = end();

function end(){
    var score = localStorage.getItem("score");
    var points = localStorage.getItem("points");
    $('#optScore').text("You created " + score + " words, for " + points + " points");

    // var array = [];
    // var xmlhttp;
    // if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    //     xmlhttp = new XMLHttpRequest();
    // } else { // code for IE6, IE5
    //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // xmlhttp.onreadystatechange = function() {
    //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //         var text = xmlhttp.responseText;
    //         // Now convert it into array using regex
    //         array = text.split(/\n|\r/g);
    //     }
    // };
    // xmlhttp.open("GET", "file:///assets/en.txt", true);
    // // xmlhttp.open("GET", "file:///C:/Users/treed/Desktop/Projects/whiteboard/assets/en.txt", true);
    // xmlhttp.send();



    // var reader = new FileReader();

    //     reader.onload = function (e) {
    //         // Entire file
    //         console.log(this);
    //         console.log(this.result);
    //         console.log(e.target.result);

    //         // By lines
    //         var lines = this.result.split('\n');
    //         var list = [];
    //         for (var line = 0; line < lines.length; line++) {
    //             list.push(lines[line]);
    //         }
    //     };

    // var file = new File([""],"file:///C:/Users/treed/Desktop/Projects/whiteboard/assets/en.txt");
    // //var file = new File([""],"assets/en.txt");

    // reader.readAsText(file);
}

// right i need to 
// dictionary into a JSON object
// break the words down into 26 arrays based on their first letter
// binary search

// so
// i need to load the file into an array