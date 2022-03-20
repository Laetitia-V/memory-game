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