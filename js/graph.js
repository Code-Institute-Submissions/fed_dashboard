queue()
        .defer(d3.json, "data/lcdata.json")
        .await(deriveGraphs);
function deriveGraphs(error, lcData) {
    var ndx = crossfilter(lcData);
     lcData.forEach(function (d) {
                 d.pupil = parseInt(d.pupil);
                 d.sat_exam = parseInt(d.sat_exam);
                 d.fail = d.sat_exam-d.criteria1;
                 
                 

    });
    var parseDate = d3.time.format("%Y").parse;
             lcData.forEach(function (d) {
                 d.date = parseDate(d.date);
             });
//generate gender colors
     var genderColors = d3.scale.ordinal()
                .domain(["Female", "Male"])
                .range(["DarkRed", "CadetBlue"]);
                
//==========DIMENSION STATEMENTS USED ACROSS ALL GRAPHS===================
    
     //used in gender selector, pie charts
    
    var  gender_dim = ndx.dimension(dc.pluck('gender'));
    
    //used in scatter plot, composite line chart
    
    var date_dim = ndx.dimension(dc.pluck('date'));
      
     var min_date = date_dim.bottom(1)[0].date;
     var max_date = date_dim.top(1)[0].date;
                
//=====SELECTOR SHOWING TOTAL STUDENTS BY GENDER=========

     // dimension gender selector 
     
    var total_gender = gender_dim.group().reduceSum(dc.pluck('pupil'));
    
    //render gender selector
    
    dc.selectMenu('#gender-selector')
        .dimension(gender_dim)
        .group(total_gender);
        
//=======NUMBER DISPLAY SHOWING TOTAL PUPILS SITTING EXAMS BY GENDER========       
     
      dc.numberDisplay("#sitting-females")
     .valueAccessor (function(d) {return(d);})
     .group(ndx.groupAll().reduceSum(function(d) {
         if (d.gender === "Female") {
         return d["sat_exam"];
         } else {
             return 0;
         }
         
     }))
     .formatNumber(d3.format("1"));
      var gender_dim = ndx.dimension(dc.pluck('gender'));
    dc.numberDisplay("#sitting-males")
     .valueAccessor (function(d) {return(d);})
     .group(ndx.groupAll().reduceSum(function(d) {
         if (d.gender === "Male") {
         return d["sat_exam"];
         } else {
             return 0;
         }
         
     }))
     .formatNumber(d3.format("1"));
//=======PIE CHART SHOWING PERCENTAGE ATTENDEES AT SCHOOL BY GENDER======= 

  //group piechart for total pupils    
   
         var total_pupils = gender_dim.group().reduceSum(dc.pluck('pupil'));   
         
     // draw pie chart for total pupils    
     
        dc.pieChart("#total-pupil-pie-chart")
                .height(350)
                .radius(90)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(total_pupils)
                .label(function(d){return d.value})
               //.legend(dc.legend().x(215).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                //(d.endAngle - d.startAngle)/(2*Math.PI)*100.
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                //return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
                return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });  
                      
 //=======SCATTER CHART SHOWING ANNUAL PUPIL DISTRIBUTION BY GENDER======= 
 
 
 
  //group and reduce for the annual pupil distribution
   //  var date_dim = ndx.dimension(dc.pluck('date'));
      
     // var min_date = date_dim.bottom(1)[0].date;
     // var max_date = date_dim.top(1)[0].date;
      var pupil_dim = ndx.dimension(function (d) {
                  return [d.date, d.pupil, d.gender];
                  
              });
     var pupil_group = pupil_dim.group();//adding .reduceSum(dc.pluck('spend')); would produce the total spend and not the number of spends
 
  // draw scatter chart for annual pupil distribution  
 
    dc.scatterPlot("#pupil-distribution-chart")
              .width(700)
                .height(350)
                .x(d3.time.scale().domain([min_date, max_date]))
                
                .brushOn(false)
                .symbolSize(8)
                .clipPadding(10)
                .yAxisLabel("No of Pupils")
                .title(function (d) {
                    return d.key[2] + " number " + d.key[1];
                })
                .colorAccessor(function (d) {
                    return d.key[2];
                })
                .colors(genderColors)
                 .margins({top: 10, right: 50, bottom: 75, left: 75})
                .dimension(pupil_dim)
                .group(pupil_group);
                
  dc.renderAll();              
}