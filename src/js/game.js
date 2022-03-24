let nbCardPairsFound = 0;
let nbCardPairsToFound;
let hasDisplay = false;
let stopwatch;
let timer;


function startGame() {
     $( "#game > .board-game > div").on("click", function() {updateCards(this.firstChild)});
}

function addButtons() {
     $("#start").on("click", function (e) {
          startStopwatch();
          setProgressBar();
          startGame();
          $("#start").prop('disabled', true);
     });
     $("#reset").on("click", function (e) {
          stopStopwatch();
          resetCards();
          resetProgressBar();
          resetStopwatch();
          $("#start").prop('disabled', false);
     });
}

function startStopwatch() {
     timer = 1;
     stopwatch = setInterval(function () {       
          const minutes = (Math.floor(timer / 60)).toString();
          const seconds = (timer % 60).toString();
          const time = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
          $("#time").html(time);         
          timer++;
     }, 1000);
}

function stopStopwatch() {
     clearInterval(stopwatch);
}

function resetStopwatch() {
     $("#time").html("00:00");
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

function resetProgressBar() {
     progressBar.progressbar({
          value: 0
     });
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