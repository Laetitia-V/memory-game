let progressBar; 
let stopwatch;

$( function() {
     //addSlider();
     loadCards();
     addProgressBar();
     addStopwatch();
});

function addStopwatch() {
     $("#start").on("click", function (e) {
          startGame();
     });
}

function addSlider() {
     $( "#slider-level" ).slider({
          min:1,
          max:5,
          value:2
     });
} 

function addProgressBar() {
     progressBar = $( "#progress-bar" ).progressbar();
}

function setProgressBar() {
     progressBar.progressbar({
          max: nbCardPairsToFound
     });
}

function updateProgressBar() {
     progressBar.progressbar({
          value: nbCardPairsFound
     });
}