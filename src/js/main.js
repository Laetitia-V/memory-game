let progressBar; 
let stopwatch;

$( function() {
     addSlider();
     loadCards();
     addProgressBar();
     addStopwatch();
});

function addStopwatch() {
     $("#start").click(function (e) {
          progressBar.progressbar({
               max: nbCardPairsToFound,
               value: nbCardPairsFound
          });
          stopwatch = setInterval(function () {       
               const minutes = Math.floor(i / 60);
               const seconds = i % 60;

               function padTo2Digits(num) {
                    return num.toString().padStart(2, '0');
               }
               const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
               $("#time").html(result);         
               i++;
          }, 1000);
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

function updateProgressBar() {
     progressBar.progressbar({
          //max: nbCardPairsToFound,
          value: nbCardPairsFound
     });
}