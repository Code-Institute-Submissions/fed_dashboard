This programme creates an interactive Frontend Development Website in the form of a Dashboard. It incorporates html, css and javascript mainly in the form of 
libraries. Jasmine is also used to do some tests on javascript used. The dashboard is visualised using d3.js and dc.js incorporating crossfilter. The dataset
chosen is published by the Department of Education and Skills and sourced from https://data.gov.ie/dataset. It is licensed under Creative Commons Attribution 
4.0. The data was downloaded in csv format and converted into a json format for use in a data folder.The json format was authenticated using a json validator 
and formatter tool located at https://jsonformatter.curiousconcept.com/. The data consists of information relating to achievement in the secondary school 
level final examination in the Republic of Ireland across both genders over a 17 year period. The data chosen is useful in representing achievement of grades 
(by predetermined criteria) in both genders and over a period of time.
Analysis of the dataset revealed, that while limited in the range of data contained, it would lend itself well to a comparison on achievement of results
among the genders. Pencil wireframe was used to plot 2 dimensional frames of the various sections of the dashboard. It was decided to use a mixture of pie 
charts, composite line charts and stacked chart to populate the dashboard and represent the data. Pie charts were useful in representing the relative contribution
(proportion) of the genders, in relation to the overall pupil total, with respect to attendance and achievements. Line charts were useful in representing trends
on an annual basis. A scatter plot was useful in illustrating the linear relationship for attendance. A stacked bar chart was used to represent parts of a 
whole in relation to achievement of the various categories of results among the genders.
All the relevant d3.dc.js and css crossfilter files were uploaded to the javascript folder and referenced in the appropriate section of the html file.  
In addition the bootstrap grid system was used so the relevant file was uploaded to the project documentation and referenced in the html file. 
As gender icons were used in the dashboard, the font awesome min.css file was referenced in the html file.
The bootstrap grid system was used to enable a responsive design approach for divs used in the dashboard. However as d3.js charts are not responsive, being 
built for larger size screens such as desktops, viewing this dashboard on  screens smaller than 1200px in width may result in alignment anomalies. For the 
purpose of this project, the dash board was designed with large screens in mind. Some attempt was made in the initial design phase to create flexible wrappers 
to fit the graphs. However this was abandoned as charts do not respond the same way as images do, for example. Work is currently being done in the software 
community  to make charts responsive and when the software is widely made available it can be applied to this project. However all divs were set up to be 
responsive and it was felt the best way to produce a dashboard suitable to all screen sizes was to omit certain graphs as the screen width decreased. This 
was fundamentally a change from what was envisaged during wire-framing, but a necessary change to produce an effective dashboard. The dashboard will behave 
as expected on screens larger in width (in the 1200px region). It should look and work reasonably well on iPad pro and iPad screen sizes as an effort was 
made to stack columns so charts could fit the screen size. For the iPad size screen it was decided to stack all chart divs to ensure good readability. As 
text and chart divs were set up with large screens in mind, it was necessary to relocate header and paragraph text to suit the graphs, for the iPad size, 
using jQuery. A media query handles styles for the header and paragraph text. For the smaller screen widths from 766 to 400px, media queries were used to 
omit the wide graphs and in screen widths below 400px the pie charts (and corresponding text fields) were also omitted. Rather than use jQuery to amend 
associated text, css styles linked to classes, were applied within the media queries in the form of display none and display block to present appropriate 
text for the shown chart. It was found that jQuery was overwriting styles applied to elements at previous window sizes..The css mehod provide a simple and 
efficient solution to this problem. 
The text-center typography from bootstrap is  employed to center text, inckluding icons within the element.  Other properties such as display: block; and 
inline-block, margin: auto  are all used to centrally position other elements and blocks of text. The bootstrap button class is used for the button to hide 
/ show the criteria key. In addition class names are applied extensively to further define elements and facilitate style targetting. The span element while 
non-semantic is used on a few occasions to attach text to elements. Comments are also used within all pages to further signify what elements are involved.
The json formatted data basically comprised a list of objects written in key/value pairs all within an array. The data set was in groups of records (columns 
rather than rows), rather than individual records, which imposed restrictions in analysing the data, to calculate for percentages, for example. From a 
gender perspective the reduceCount function was redundant. This was overcome by using piecharts to present percentages, as dc.js  allows for percentages 
to be calculated on the basis of the angles of the pie slices displayed, as the chart is rendered. The dataset was extended by deriving further key value 
pairs from the existing data properties, for actual numbers achieving the criteria, within the forEach method within the deriveGraph function. Date and 
number data was also parsed within this method. The date being a string was parsed to enable crossfilter to recognise it. Some of the datum numbers were 
also parsed as integers as an extra precaution.
Prior to parsing, an instance of crossfilter was set up based on the dataset, in the deriveGraph function. A domain and range were set up to assign colors 
to the gender type, DarkRed to represent female and CadetBlue to represent male. These colors were used across all graphs except the stack chart and 
composite results chart, to maintain visual consistency. The font awesome gender icons were also styled in these colors. 
Two dimensions were used to derive all but one of the graphs and were only declared once, to cover all graphs. One based on the gender datum and one based
on the date datum. A separate dimension was created for the scatter plot. The groups varied across the graphs and fundamentally aggregated the totals using 
reduceSum. However the same groups were used to aggregate totals in the stacked chart and the doughnut charts resulting in further efficiency in coding. 
In most case the dc.pluck shortcut was used rather than the return function (d) method, with the exception of a few instances in the composite charts where 
specific functions were written to total the individual gender type. Within these functions the +d syntax was used to ensure that numbers that may be 
represented as a string were converted into a number.
Variable and function names were kept semantic in keeping with what needed to be produced and in relation to the datum being considered.
Once the dimensions and groups were derived the graphs were easily plotted using the relevant dc-class (e.g. dc.pieChart) and its methods. Height, widths 
and radii were chosen so that rendered charts would neatly visualise data, bearing in mind they also had to fit within the designated bootstrap column widths. 
Legends were used were appropriate. Title and label functions were used to show tooltips on the graphs in the browser window. The brushOn was set to false 
to ensure interactive elements such as tooltips stayed enabled.
Pie / Doughnut charts were used to illustrate numerical proportions between the genders in relation to total attendance figures and results achieved.
A scatter plot was used to illustrate any variance in the annual numbers attending school by gender.
Composite line charts were used to illustrate similar type information on an annual basis, enabling several line graphs to be incorporated on the same grid, 
thereby minimising code used. One was used to show numbers of pupils sitting the examination and another was used to show the numbers attaining the 
different result criteria.
A stacked bar chart was used to proportionally represent the numbers attaining the result criteria by gender. Again it was a useful and efficient way to 
illustrate the 7 categories for each gender on one graph.
The header section incorporates a number selector and gender number boxes. 
The number selector was incorporated to show total number of pupils by gender over the 17 year time period. The figure 1 pie chart in the section below, 
complements this element, by showing the percentage values. Figure 2 further complements the previous two elements by showing annual pupil attendance 
distribution.
The gender number boxes represent the total numbers of male and female pupils sitting the examination. This data is complemented by fig 3 in the results 
distribution by gender section, which shows the numbers sitting the exam annually by total and by gender.
Figures 4 to 7 focus on the results achieved. Figures 4 and 7 are doughnuts illustrating the percentage of male and female pupils that achieved each 
grade criterion. Figure 5 represents the grades achieved in the form of a stacked chart by gender. Figure 6 is a composite line graph illustrating the 
numbers who achieved each criterion annually by gender. Interaction is limited to the dimensions and groupings calculated and clicking on the female gender 
selector for example, will filter all female results across number box and scatter and composite graphs. Clicking on the figure 1 pie chart will do the same. 
Tooltips provide for interaction while on a particular area of the graph.
The penultimate section of the dashboard consists of a legend key defining what each result criterion is. It can be revealed or hidden by the click of a 
button. Some basic jasmine tests were written for this section. All the relevant jasmine framework cdnjs files were referenced in the index html file.  
In addition the jquery file was uploaded to the js folder and referenced in the index html file. jQuery methods were used to toggle the criteria key 
paragraphs hidden or revealed. A mouse over event was used to fade the button on mouse enter mouse leave. Other methods used included the window resize 
function which was used in conjunction with the window.width method to modify text within the dom. The text method was used to replace or maintain text 
depending on the class and screen width.
The document.ready function was used in the script file to ensure that the page was fully loaded before manipulations took place  using jQuery.
The final footer section contains details of the license covering the dataset. There is an icon to download a summary pdf page of the license and a link 
to the full copy of the license on the web.
The developer tool was used to inspect elements and apply styles for consideration. The elements section was used to inspect the div layout and to check 
on bootstrap styles that needed to be over-ridden. The console section was used to traverse the dom, to list the various elements to check classes and ids.
This enabled non repetition when deriving new ids or classes and also sourced the position of redundant ones to be deleted.  It had been considered to use 
the replace.with method to modify text paragraphs on screen resize but the text method was found to be a more effective solution as the replace method was 
removing data from the dom that was needed when the screen width increased again. There was also limitations to this method also previous elements were 
being overwritten despite using different class names.  This was resolved by using css. It was also considered to use the add.class and remove.class method 
to apply styles to the elements. However for this particular project the css styles in the stylesheet were adequate and encumbering the project with extra 
jQuery methods in this context was not necessary. Styles were added through the console for viewing, but once adopted were copied into the css style sheet.