let cardSelected = {};
let nbCardPairsFound = 0;
let nbCardPairsToFound;

function addCard(card, round) {
     const name = card.name;
     const file = "../../public/cards/" + name + ".png";

     const id = name + round;
     $( "#game > .board-game")
          .append($("<div></div>")
               .attr({class: "board-game__card"})
               .append($("<img></img>")
                    .attr({id: id, class:name, src: file})
               ));
}

function addRandomCards(data, round) {
     let cards = [...data];
     let hasAllCards = false;
     let nbCards = cards.length;
     while (!hasAllCards) {
          const randomIndice = (nbCards > 1) ? getRandomNumber(0, nbCards - 1) : 0;
          const randomCard = cards[randomIndice];
          addCard(randomCard, round);
          cards.splice(randomIndice, 1);
          nbCards -= 1;
          if (nbCards == 0) hasAllCards = true;
     }
}

function getRandomNumber(min, max) {
     return Math.round(Math.random() * (max - min) + min);
}

function loadCards() {
     $.getJSON("../../public/cards/cards.json", function(data){
          nbCardPairsToFound = data.length;
          //ajout de cartes aléatoires 2 fois pour former les paires
          for (i of [1, 2]) addRandomCards(data, i);
     }).fail(function(){
          console.log("An error has occurred.");
     });
}

function startGame() {
     
     setProgressBar();

     let i = 1; 
     stopwatch = setInterval(function () {       
          const minutes = (Math.floor(i / 60)).toString();
          const seconds = (i % 60).toString();
          const result = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
          $("#time").html(result);         
          i++;
     }, 1000);

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