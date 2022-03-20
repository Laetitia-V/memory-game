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