queue()
        .defer(d3.json, "data/lcdata.json")
        .await(deriveGraphs);
function deriveGraphs(error, lcData) {
    var ndx = crossfilter(lcData);
     lcData.forEach(function (d) {
                 d.pupil = parseInt(d.pupil);
                 d.sat_exam = parseInt(d.sat_exam);
                 d.fail = d.sat_exam-d.criteria1;
                 d.pass1 = d.criteria1-d.criteria2
                 d.pass2 = d.criteria2-d.criteria3
                 d.pass3 = d.criteria3-d.criteria4
                 d.pass4 = d.criteria4-d.criteria5
                 d.pass5 = d.criteria5-d.criteria6
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
    
     //used in gender selector, pie charts, stacked chart
    
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
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });  
                      
 //=======SCATTER CHART SHOWING ANNUAL PUPIL DISTRIBUTION BY GENDER======= 
 
  //group and reduce for the annual pupil distribution

      var pupil_dim = ndx.dimension(function (d) {
                  return [d.date, d.pupil, d.gender];
                  
              });
     var pupil_group = pupil_dim.group();
 
  // draw scatter chart for annual pupil distribution  
 
    dc.scatterPlot("#pupil-distribution-chart")
              .width(700)
                .height(350)
                .x(d3.time.scale().domain([min_date, max_date]))
                .brushOn(false)
                .symbolSize(8)
                .clipPadding(10)
                .yAxisLabel("No of Pupils")
                .xAxisLabel("Year")
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
                
 //=======COMPOSITE LINE CHART ANNUAL NUMBERS WHO SAT THE EXAM BY TOTAL AND GENDER=======                 
                
         function examGend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.sat_exam;
                 } else {
                     return 0;
                 } 
                };
            }
         var total_satExam = date_dim.group().reduceSum(dc.pluck('sat_exam'));  
         var maleSatExam = date_dim.group().reduceSum(examGend('Male'));
         var femaleSatExam = date_dim.group().reduceSum(examGend('Female'));        
                
        
  // draw composite chart for annual pupil distribution  
  
  var compositeChart = dc.compositeChart('#exam-composite-chart');
                compositeChart
                .width(700)
                .height(350)
                .dimension(date_dim)
                .x(d3.time.scale().domain([min_date, max_date]))
                .yAxisLabel("No of Pupils")
                .xAxisLabel("Year")
                .legend(dc.legend().x(100).y(50).itemHeight(13).gap(15))
                .renderHorizontalGridLines(true)
                .margins({top: 10, right: 75, bottom: 75, left: 75})
                .title(function(d) { return d.value; })
                .compose([
                     dc.lineChart(compositeChart)
                    .colors('black')
                    .group(total_satExam, 'Total'),
                     dc.lineChart(compositeChart)
                    .colors('DarkRed')
                    .group(femaleSatExam,'Female'),
                    dc.lineChart(compositeChart)
                    .colors('CadetBlue')
                    .group(maleSatExam,'Male'),
                   
                   ])
                 .brushOn(false);  
  //=======DONUT CHART SHOWING PERCENTAGE PUPILS FAILING BY GENDER======= 
  
   //group and reduce for the top grades
   
     var fail = gender_dim.group().reduceSum(dc.pluck('fail'));   
            
  // draw donut chart for showing percentage failed  
  
  dc.pieChart("#percentFail-pieChart")
                .height(350)
                .radius(90)
                .innerRadius(35)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(fail)
                .label(function(d){return d.value})
                .legend(dc.legend().x(170).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });  
//=======STACKED CHART SHOWING TOTAL NUMBERS BY GRADE BY GENDER======= 
  
  // group stacked chart showing numbers that passed  
  var pass1 = gender_dim.group().reduceSum(dc.pluck('pass1'));
  var pass2 = gender_dim.group().reduceSum(dc.pluck('pass2'));
  var pass3 = gender_dim.group().reduceSum(dc.pluck('pass3'));
  var pass4 = gender_dim.group().reduceSum(dc.pluck('pass4'));
  var pass5 = gender_dim.group().reduceSum(dc.pluck('pass5'));
  var criteria6 = gender_dim.group().reduceSum(dc.pluck('criteria6'));
  var fail = gender_dim.group().reduceSum(dc.pluck('fail'));
  
   // draw stacked chart showing numbers of grades by gender 
  
  dc.barChart("#stack-results")
        .width(200)
        .height(600)
        .dimension(gender_dim)
        .group(pass1, "criterion1")
         .stack(pass2, "criterion2")
         .stack(pass3, "criterion3")
         .stack(pass4, "criterion4")
         .stack(pass5, "Criterion5")
         .stack(criteria6, "Criterion6")
          .stack(fail, "Failed")
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .margins({top: 10, right: 60, bottom: 50, left: 50})
                .yAxisLabel("No of Pupils")
                .legend(dc.legend().x(144).y(50).itemHeight(10).gap(5))
                .xAxisLabel("Gender");
                
 //=======COMPOSITE LINE CHART SHOWING GRADES ACHIEVED ANNUALLY BY GENDER=======  
 
    //functions to derive croups
    
    function pass1Gend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.pass1;
                 } else {
                     return 0;
                 } 
                };
            } 
        function pass2Gend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.pass2;
                 } else {
                     return 0;
                 } 
                };
            } 
            function pass3Gend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.pass3;
                 } else {
                     return 0;
                 } 
                };
            } 
            function pass4Gend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.pass4;
                 } else {
                     return 0;
                 } 
                };
            } 
            function pass5Gend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.pass5;
                 } else {
                     return 0;
                 } 
                };
            } 
            function pass6Gend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.criteria6;
                 } else {
                     return 0;
                 } 
                };
            } 
            function passGend(gender) {
                return function (d) {
                   if (d.gender === gender) {
                     return +d.fail;
                 } else {
                     return 0;
                 } 
                };
            } 
     // derive groups for composite chart 
     
    var malePass1 = date_dim.group().reduceSum(pass1Gend('Male'));
    var femalePass1 = date_dim.group().reduceSum(pass1Gend('Female')); 
    var malePass2 = date_dim.group().reduceSum(pass2Gend('Male'));
    var femalePass2 = date_dim.group().reduceSum(pass2Gend('Female')); 
    var malePass3 = date_dim.group().reduceSum(pass3Gend('Male'));
    var femalePass3 = date_dim.group().reduceSum(pass3Gend('Female')); 
    var malePass4 = date_dim.group().reduceSum(pass4Gend('Male'));
    var femalePass4 = date_dim.group().reduceSum(pass4Gend('Female')); 
    var malePass5 = date_dim.group().reduceSum(pass5Gend('Male'));
    var femalePass5 = date_dim.group().reduceSum(pass5Gend('Female')); 
    var malePass6 = date_dim.group().reduceSum(pass6Gend('Male'));
    var femalePass6 = date_dim.group().reduceSum(pass6Gend('Female')); 
    var maleFail = date_dim.group().reduceSum(passGend('Male'));
    var femaleFail = date_dim.group().reduceSum(passGend('Female')); 
    
     // draw composite chart for showing annual grades achieved by gender
    
         var compositeChart = dc.compositeChart('#crit-composite-chart');
                compositeChart
                .width(900)
                .height(600)
                .dimension(date_dim)
                .x(d3.time.scale().domain([min_date, max_date]))
                .yAxisLabel("No of Pupils")
                .xAxisLabel("Year")
                .legend(dc.legend().x(350).y(10).itemHeight(13).gap(5))
                .renderHorizontalGridLines(true)
                .margins({top: 10, right: 75, bottom: 75, left: 75})
                  .title(function(d){return d.value})
                .compose([
                   dc.lineChart(compositeChart)
                    .colors('Aquamarine')
                    .group(femalePass1, "Female Criterion 1"),
                     dc.lineChart(compositeChart)
                    .colors('Aqua')
                     .group(malePass1, "Male Criterion 1"),
                   dc.lineChart(compositeChart)
                    .colors('GoldenRod')
                    .group(femalePass2,'Female Criterion 2'),
                    dc.lineChart(compositeChart)
                    .colors('DarkOrange')
                    .group(malePass2, 'Male Criterion 2'),
                     dc.lineChart(compositeChart)
                    .colors('DarkOliveGreen')
                    .group(femalePass3,'Female Criterion 3'),
                    dc.lineChart(compositeChart)
                    .colors('DarkGreen')
                    .group(malePass3, 'Male Criterion 3'),
                    dc.lineChart(compositeChart)
                    .colors('IndianRed')
                    .group(femalePass4,'Female Criterion 4'),
                     dc.lineChart(compositeChart)
                    .colors('Crimson')
                    .group(malePass4, 'Male Criterion 4'),
                   dc.lineChart(compositeChart)
                    .colors('PaleVioletRed')
                    .group(femalePass5,'Female Criterion 5'),
                    dc.lineChart(compositeChart)
                    .colors('Orchid')
                    .group(malePass5, 'Male Criterion 5'),
                    dc.lineChart(compositeChart)
                    .colors('Brown')
                    .group(femalePass6,'Female Criterion 6'),
                    dc.lineChart(compositeChart)
                    .colors('FireBrick')
                    .group(malePass6, 'Male Criterion 6'),
                     dc.lineChart(compositeChart)
                    .colors('Pink')
                    .group(femaleFail,'Female Fail'),
                    dc.lineChart(compositeChart)
                    .colors('HotPink')
                    .group(maleFail, 'Male Fail')
                      ])
                
                .brushOn(false);
 
  //=======DONUT CHARTS SHOWING PERCENTAGE OF GRADES ACHIEVED BY GENDER======= 
  
  //derive groups for charts
        var criterion1 = gender_dim.group().reduceSum(dc.pluck('criteria1'));
        var criterion2 = gender_dim.group().reduceSum(dc.pluck('criteria2'));
        var criterion3 = gender_dim.group().reduceSum(dc.pluck('criteria3'));
        var criterion4 = gender_dim.group().reduceSum(dc.pluck('criteria4'));
        var criterion5 = gender_dim.group().reduceSum(dc.pluck('criteria5'));
        var criterion6 = gender_dim.group().reduceSum(dc.pluck('criteria6'));
        
     // draw donut charts for showing percentages achieving grades by gender 
  
  dc.pieChart("#percent-pieChart1")
                .height(150)
                .radius(70)
                .innerRadius(30)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(criterion1)
                .label(function(d){return d.value})
                .legend(dc.legend().x(215).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });   
        dc.pieChart("#percent-pieChart2")
                .height(150)
                .radius(70)
                .innerRadius(30)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(criterion2)
                .label(function(d){return d.value})
                .legend(dc.legend().x(215).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });   
        dc.pieChart("#percent-pieChart3")
                .height(150)
                .radius(70)
                .innerRadius(30)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(criterion3)
                .label(function(d){return d.value})
                .legend(dc.legend().x(215).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });   
        dc.pieChart("#percent-pieChart4")
                .height(150)
                .radius(70)
                .innerRadius(30)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(criterion4)
                .label(function(d){return d.value})
                .legend(dc.legend().x(215).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });   
        dc.pieChart("#percent-pieChart5")
                .height(150)
                .radius(70)
                .innerRadius(30)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(criterion5)
                .label(function(d){return d.value})
                .legend(dc.legend().x(215).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });   
        dc.pieChart("#percent-pieChart6")
                .height(150)
                .radius(70)
                .innerRadius(30)
                .transitionDuration(1500)
                .dimension(gender_dim)
                .group(criterion6)
                .label(function(d){return d.value})
                .legend(dc.legend().x(215).y(155).itemHeight(13).gap(5))
                .colors(genderColors)
                .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });   
  
                
  dc.renderAll();              
}
