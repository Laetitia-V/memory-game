let cardSelected = {};
let nbCardPairsFound = 0;
let nbCardPairsToFound;
let stopwatch;


function startGame() {
     setProgressBar();
     $( "#game > .board-game > div").on("click", function(){
          const img = this.firstChild;
          $(img).css("display", "block");
          if (Object.keys(cardSelected).length == 0) {
               cardSelected[1] = img;
          }
          else if (Object.keys(cardSelected).length == 1) {
               cardSelected[2] = img;
          }
          else if (Object.keys(cardSelected).length == 2) {
               const firstCardName = $(cardSelected[1]).attr("class");
               const secondCardName = $(cardSelected[2]).attr("class");
               if (firstCardName != secondCardName) {
                    $(cardSelected[1]).css("display", "none");
                    $(cardSelected[2]).css("display", "none");
               }
               else {
                    nbCardPairsFound += 1;
                    updateProgressBar();
                    if (nbCardPairsFound == nbCardPairsToFound) clearInterval(stopwatch);
                    $(cardSelected[1]).parent().css("opacity", "0");
                    $(cardSelected[2]).parent().css("opacity", "0");
               }
               cardSelected = {};
               cardSelected[1] = img;
          }
     });
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
          const result = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
          $("#time").html(result);         
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