$( function() {
     addSlider();
     addProgressBar();
     loadCards();
});

function addSlider() {
     $( "#slider-level" ).slider({
          min:1,
          max:5,
          value:2
     });
} 

function addProgressBar() {
     $( "#progress-bar" ).progressbar();
}

function loadCards() {
     $.getJSON("../../public/cards/cards.json", function(cards){
          for(const card of cards){
               addCard(card);
          }
      }).fail(function(){
          console.log("An error has occurred.");
      });
}

function addCard(card) {
     const name = card.name;
     const file = "../../public/cards/" + name + ".png";

     for (i of [0, 1]){
          const id = name + i;
          $( "#game > .board-game").append($("<div></div>")
                         .attr({
                              id: id,
                              class: "board-game__card" 
                         }));
          $( "#" + id).append($("<img></img>")
                         .attr({
                              src: file
                         }));
     }
}