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
          $( "#game > .board-game > div").click(function() {
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
          })
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