let progressBar; 

$( function() {
     addSlider();
     loadCards();
     addProgressBar();
});

function addSlider() {
     $( "#slider-level" ).slider({
          min:1,
          max:5,
          value:2
     });
} 

function addProgressBar() {
     console.log(nbCardPairsToFound);
     progressBar = $( "#progress-bar" ).progressbar({
          min:0,
          max: nbCardPairsToFound,
          value: nbCardPairsFound
     });
}

function updateProgressBar() {
     progressBar.progressbar({
          max: nbCardPairsToFound,
          value: nbCardPairsFound
     });
}