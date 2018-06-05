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
   
 //modify text headers and paragraphs where charts are omitted based on screen width  
  
   $( window ).resize(function() {
     let width = $(window).width();
    if(width >= 767 && width <= 1023) {
       $("h3.relocate-to-2").text("Fig.1 below shows that slightly more female than male pupils attended school during the stated timespan");
   }else{
       $("h3.relocate-to-2").text("Fig.2 Annual Pupil Figures by Gender 2000-2016");
   }
    if(width >= 767 && width <= 1023) {
       $("p.relocate-to-1").text("Fig.2 Annual Pupil Figures by Gender 2000-2016");
   }else{
       $("p.relocate-to-1").text("Fig.1 above shows that slightly more female than male pupils attended school during the stated timespan");
   }
   if(width >= 767 && width <= 1023) {
       $("h3.relocate-to-4").text("Fig.3 below correlates with figure 2 above as the pattern of those who sat the exam closely follows the pattern of total students attending school");
   }else{
       $("h3.relocate-to-4").text("Fig.4 Gender Percentage of those who failed 2000-2016");
   }
    if(width >= 767 && width <= 1023) {
       $("p.relocate-to-3").text("Fig.4 Gender Percentage of those who failed 2000-2016");
   }else{
       $("p.relocate-to-3").text("Fig.3 above correlates with figure 2 above as the pattern of those who sat the exam closely follows the pattern of total students attending school");
   }
    if(width >= 767 && width <= 1023) {
       $("h3.relocate-to-6").text("Fig.5 below indicates that more female pupils achieve the higher grades");
   }else{
       $("h3.relocate-to-6").text("Fig.6 Annual Results by Gender 2000 - 2016");
   }
    if(width >= 767 && width <= 1023) {
       $("p.relocate-to-5").text("Fig.6 Annual Results by Gender 2000 - 2016");
   }else{
       $("p.relocate-to-5").text("Fig.5 above indicates that more female pupils achieve the higher grades");
   }
   
});
});
   