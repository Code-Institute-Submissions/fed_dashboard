$(document).ready(function() {
    //adds slideTogggle to buttons to toggle criteria key section open and closed
    $("#criteria_key").click(function(){
        $("#key").slideToggle('1000');
    });

  //add fade to button id on mouserenter and mouseleave 
    $("#criteria_key").mouseenter(function(){
        $('#criteria_key').fadeTo(1000, 0.5);
    });
    $("#criteria_key").mouseleave(function(){
        $('#criteria_key').fadeTo(1000, 1);
    });
});
  