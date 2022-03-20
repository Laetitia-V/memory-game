let nbCardPairsFound = 0;
let nbCardPairsToFound;
let hasDisplay = false;
let stopwatch;


function startGame() {
     setProgressBar();
     $( "#game > .board-game > div").on("click", function() {updateCards(this.firstChild)});
}

function addStopwatch() {
     $("#start").on("click", function (e) {
          startStopwatch();
          startGame();
     });
}

function startStopwatch() {
     i = 1;
     stopwatch = setInterval(function () {       
          const minutes = (Math.floor(i / 60)).toString();
          const seconds = (i % 60).toString();
          const time = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
          $("#time").html(time);         
          i++;
     }, 1000);
}

function addSliderLevel() {
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