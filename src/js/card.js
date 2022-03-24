let cardSelected = {};

function addCard(card, round) {
     const name = card.name;
     const file = "../../public/images/cards/" + name + ".png";

     const id = name + round;
     $( "#game > .board-game")
          .append($("<div></div>")
               .attr({class: "board-game__card"})
               .append($("<img></img>")
                    .attr({id: id, class:name, src: file}))
               .append("<div class='board-game__card--back'></div>")
          );
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

function hideCards() {
     $(cardSelected[1]).css("display", "none");
     $(cardSelected[2]).css("display", "none");
     $("#" + cardSelected[1].id + " + div").css("display", "block");
     $("#" + cardSelected[2].id + " + div").css("display", "block");
}

function loadCards() {
     $.getJSON("../../public/json/cards.json", function(data){
          nbCardPairsToFound = data.length;
          //ajout de cartes aléatoires 2 fois pour former les paires
          for (i of [1, 2]) addRandomCards(data, i);
     }).fail(function(){
          console.log("An error has occurred.");
     });
}

function resetCards() {
     $( "#game > .board-game").empty();
     loadCards();  
}

function updateCards(img){
     //si moins de 2 cartes sont retournees (or paires trouvees)
     if (!hasDisplay) {
          $("#" + img.id + " + div").css("display", "none");
          $(img).css("display", "block");
          if (Object.keys(cardSelected).length == 0) {
               cardSelected[1] = img;
          }
          else if (Object.keys(cardSelected).length == 1) {
               cardSelected[2] = img;
               const firstCardName = $(cardSelected[1]).attr("class");
               const secondCardName = $(cardSelected[2]).attr("class");
               if (firstCardName != secondCardName) {
                    hasDisplay = true;
                    setTimeout(function() {
                         hideCards();
                         cardSelected = {};
                         hasDisplay = false;
                    }, 1000);
               }
               else {
                    nbCardPairsFound += 1;
                    updateProgressBar();
                    if (nbCardPairsFound == nbCardPairsToFound) stopStopwatch();
                    cardSelected = {};
               }
          }
     }
     //sinon attendre que le delai d'affichage des cartes soit fini
}