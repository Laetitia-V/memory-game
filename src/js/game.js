let nbCardPairsFound = 0;
let nbCardPairsToFound;
let progressBar; 
let stopwatch;
let timer;

/*function addSliderLevel() {
     $( "#slider-level" ).slider({
          min:1,
          max:5,
          value:2
     });
}*/ 

function resetGame() {
     stopStopwatch();
     resetCards();
     resetProgressBar();
     resetStopwatch();
     $("#start").prop('disabled', false);
}

function setGame() {
     $( "#game > .board-game > div").on("click", function() {
          updateCards(this.firstChild)
     });
}

function startGame() {
     setGame();
     initProgressBar();
     startStopwatch();
     $("#start").prop('disabled', true);
}

function setButtons() {
     $("#start").on("click", function (e) {
          startGame();
     });
     $("#reset").on("click", function (e) {
          resetGame(); 
     });
}

function resetStopwatch() {
     $("#time").html("00:00");
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

function createProgressBar() {
     progressBar = $( "#progress-bar" ).progressbar();
}

function initProgressBar() {
     progressBar.progressbar({
          max: nbCardPairsToFound
     });
}

function resetProgressBar() {
     progressBar.progressbar({
          value: 0
     });
}

function updateProgressBar() {
     progressBar.progressbar({
          value: nbCardPairsFound
     });
}