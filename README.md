# fed_Dashboard

This application creates an interactive Frontend Development Website in the form of a Dashboard. Fundamentally it 
analyses data in relation to results achieved by leaving cert students in Ireland over a 17 year period and presents
it in a simple interactive visual format. The dominant theme is achievement across genders.  
The dashboard is visualised using d3 - dc.js incorporating crossfilter.It uses a range of graphs to convey the data.
Number boxes display totals. A scatter plot is used to illustrate any variance in the annual numbers attending 
school by gender. Composite line charts illustrate similar type information on an annual basis. A stacked bar chart 
is used to proportionally represent the numbers attaining the result criteria by gender. Pie charts are used to 
illustrate percentages across gender.
Some jquery is incorporated to hide the criteria key and switch headings and captions on screen resize.   
Some jasmine testing is used to test some of the script used. 
## UX ##

### Problem Definition ###
In order to fulfill brief requirements the issues to be sorted were defined as:
* Build a data dashboard (single page application) that visualizes a chosen dataset 
* Use locally stored data or that sourced from an API
* Visualise the data using D3.js and dc.js

To focus the design a data source was chosen to quickly progress user stories and wireframing. Data from the
department of education in relation to the leaving certificate results obtained over a 17 year period was chosen.
The data consists of information relating to achievement in the secondary school level final examination in 
the Republic of Ireland across both genders over a 17 year period. Analysis of the dataset revealed, that while 
limited in the range of data contained, it would lend itself well to a comparison on achievement of grades 
(by predetermined criteria) across both genders over a period of time.  
This is quite specific data and would only be used by someone particularly interested in statistical data on 
leaving certificate attendances and results achieved. Thus user profiles would generally be limited to educationalists 
and researchers with a vested interest in education. 

### User Stories ###
User stories include:
* As a researcher I am interested in obtaining information on cross gender performance in a particular examination
* As a researcher I am interested in analysing trends on cross gender performance in a particular examination
* As a educationalist I am interested in observing any anomalies on cross gender performance in a particular examination
* As a socio-economist I am interested in observing trends on pupil attendances across all genders

### Wireframing ###
Pencil was used to draw up a wireframe of how the application might be arranged.It is saved as the pencilDiag.pdf in 
the additional_info folder in the data dir. 
### Design ###
#### Data analysis ####
The data was downloaded in csv format and converted into a json format for use in a data folder. While charts can 
be constructed from both CSV type data and JSON format, JSON was chosen as the preferred data format for this 
project. It is a universal and lightweight data type, easily readable and writable and is easily generated and 
parsed by machines.  
The json formatted data basically comprised a list of objects written in key/value pairs, all within an array.  
The data set was in groups of records (columns rather than rows), rather than individual records, which imposed 
restrictions in analysing the data, to calculate for percentages, for example. From a gender perspective the 
reduceCount function was redundant. This was overcome by using piecharts to present percentages, as dc.js allows 
for percentages to be calculated on the basis of the angles of the pie slices displayed, as the chart is rendered.     
The dataset was extended by deriving further key value pairs from the existing data properties, for actual numbers 
achieving the criteria, within the forEach method within the deriveGraph function. Date and number data was also 
parsed within this method. The date being a string was parsed to enable crossfilter to recognise it. Some of the 
datum numbers were also parsed as integers as an extra precaution. (Aside: As additional belt and braces all totals 
and percentages returned in the charts were cross checked with a spreadsheet analysis).  

#### Dashboard ####
In general black text on lightly contrasting background colours is used. Colours are kept to a minimum with the 
exception of figures 5 and 6 where a lot of data represented by various colours is required. The object is to keep 
a formal look to the page, while maintaing a pleasant visual feel. A domain and range is set up to assign colors 
to the gender type, DarkRed to represent female and CadetBlue to represent male. These colors are used across all 
graphs except the stack chart and composite results chart (figures 5 and 6), to maintain visual consistency. The 
font awesome gender icons are also styled in these colors.  
Prior to parsing of data, an instance of crossfilter was set up based on the dataset, in the deriveGraph function.
The data is presented within 5 sections on a web page. A header section contains total data, 4 other sections 
present the various charts described in features below. Another section contains the pass criteria key and a 
footer section contains the dataset license information.  
It was decided to use a mixture of pie charts, composite line charts and stacked chart to populate the dashboard 
and represent the data.  
Pie charts are useful in representing the relative contribution (proportion) of the genders, in relation to 
the overall pupil total, with respect to attendance and achievements. A full pie chart was chosen to represent the
total number of pupils attending for the chosen time period (each slice representing gender). Donut charts also 
incorporating a legend were chosen to illustrate the percentage of male and female pupils that achieved each grade 
criterion.  
Composite line charts were chosen to illustrate similar type information on an annual basis, enabling several line 
graphs to be incorporated on the same grid, thereby minimising code used. Line charts are useful in representing 
trends on an annual basis. One is used to show numbers of pupils sitting the examination and another is used to 
show the numbers attaining the different result criteria.      
A scatter plot is useful in illustrating a linear relationship and this was chosen to illustrate attendance over 
the time period for both genders.  
A stacked bar chart is used to proportionally represent the numbers attaining the result criteria by gender. 
Again it was a useful and efficient way to illustrate the 7 categories for each gender on one graph.  
Two dimensions are used to derive all but one of the graphs and are only declared once, to cover all graphs. 
One based on the gender datum and one based on the date datum. A separate dimension is created for the scatter 
plot. The groups vary across the graphs and fundamentally aggregate the totals using reduceSum. However the 
same groups are also used to aggregate totals in the stacked chart and the doughnut charts resulting in further 
efficiency in coding.  
In most cases the dc.pluck shortcut is used rather than the return function (d) method, with the exception of a 
few instances in the composite charts where specific functions are written to total the individual gender type. 
Within these functions the +d syntax is used to ensure that numbers that may be represented as a string are 
converted into a number.     
Once the dimensions and groups are derived the graphs are easily plotted using the relevant dc-class (e.g. dc.
pieChart) and its methods. Height, widths and radii are chosen so that rendered charts will neatly visualise 
data, bearing in mind they also have to fit within the designated bootstrap column widths.     
Legends are used were appropriate. Title and label functions are used to show tooltips on the graphs in the 
browser window. The brushOn is set to false to ensure interactive elements such as tooltips stay enabled.

Comments are used within all pages to describe a coding section or to signify to other parties what elements are 
involved.  
## Features ##
The features are briefly described below
### Existing Features ###

- Feature 1 - A number selector in the top section is incorporated to show total number of pupils by gender over 
the 17 year time period. Clicking on this isolates either male or female and is interactive across the composite
and scatter plots and number boxes. Select all shows both genders together.  
- Feature 2 - The header section also incorporates gender number boxes(with associated fontawesome icons). The gender 
number boxes represent the total numbers of male and female pupils sitting the examination and are interactive
with all graphs.  
- Feature 3-  In section 2 The figure 1 pie chart complements the number selector element, by showing the percentage 
values. On hover a tooltip shows the actual numbers. This chart is interactive with the composite and scatter charts.  
- Feature 4 - Also in section 2 The fig 2. scatter plot further complements this data and illustrates any variance 
in the annual numbers attending school by gender. On hover a tooltip reveals the actual number.  
- Feature 5 - In section 3 Fig 3 uses a composite line graph to illustrate the numbers of pupils by gender that sat the 
examination. Again there is tooltip and interactive functionality.  
- Feature 6 - In section 3 figure 4 uses a donut pie chart to illustrate the percentage fail across genders of those 
who did fail. Again there is tooltip and interactive functionality. For example clicking on the male slice to isolate
the males in the other charts, reveals that in 2015, of 26369 males that sat the exam, 1205 failed to achieve the pass 
criterion.  
- Feature 7 - In section 4 figure 5 is a stacked barchart illustrating the different pass criteria across all genders.
It complements figures 4, 6 and 7 which all present similar information in a different visual format. As with all 
the crossfiter charts tooltip and interactive functionality exists.  
- Feature 8 -  In section 4 figure 6 presents the pass criteria across the genders on an annual basis as a composite 
line graph allowing trends to be viewed and analysed. Tooltips and interactive functionality allow the different
lines to be viewed individually and thus data easily obtained.  
- Feature 9 - Fig 7 in section 5 presents each pass criterion in donut form and is an extension of figure 4. For example
fig f. shows that 58.6% (33779) of females achieved the highest grades over the time period, as compared to 40.4% 
(22868) of male pupils.  
- Feature 10 - Section 6 contains the criteria key legend defining what each result criterion is. It can be revealed 
or hidden by the click of a button in section 5.   
- Feature 11 - The final footer section 7 contains details of the license covering the dataset. There is an icon to 
download a summary pdf page of the license and a link to the full copy of the license on the web. 

### Features left to implement ### 
- When additional information in relation to results achievement by subject is made available the dashboard could be 
extended to include cross gender analysis by subject. 
- It might also be useful to conduct analysis by age.  
- Mobile responsiveness is currently an issue with dc crossfilter charts. Work is being done within the development 
community on chart responsiveness and solutions when designed, completed, and fully tested could be adopted to
further enhance the dashboard in the future.

## Technologies used ##
- [json validator and formatter tool](https://jsonformatter.curiousconcept.com/)     
 - The json format was authenticated using a json validator and formatter tool.     
This dashboard incorporates html, css and javascript mainly in the form of libraries.   
- [dc - crossfilter files](https://cdnjs.com/libraries)   
    - The urls for these files were retrieved using wget and loaded into the relevent static/ directories. Once
downloaded to the css and javascript dirs, they were referenced in the appropriate section of the html file using
script tags.     
- [Bootswatch Theme](https://bootswatch.com/)      
    - A cosmo theme was chosen and the file copied into the static/css dir by using wget with the url in the bash 
terminal. This facilitates the use of the bootstrap grid system , enabling a responsive design approach for divs 
used in the dashboard. However as d3.js charts are not responsive, being built for larger size screens such as desktops, 
viewing this dashboard on screens smaller than 1200px in width will result in loss of responsiveness. For the 
purpose of this project, the dash board is designed with large screens in mind.     
The text-center typography from bootstrap is  employed to center text, including icons within the element. Other 
properties such as display: block; and inline-block, margin: auto  are all used to centrally position other 
elements and blocks of text. The bootstrap button class is used for the button to hide / show the criteria key. 
In addition class names are applied extensively to further define elements and facilitate style targetting. The 
span element while non-semantic is used on a few occasions to attach text to elements.  
- [Fontawesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css)  
    - Fontawesome icons were used in the dashboard, to visualise the genders.      
- [jQuery:](https://jquery.com/)     
    - jQuery methods  are used to toggle the criteria key paragraphs hidden or revealed. A mouse over event is used to 
fade the button on mouse enter mouse leave.  
Another method uses the window resize function which is used in conjunction with the window.width method to modify 
text within the dom. The text method is used to replace or maintain text depending on the class and screen width.    
The document.ready function is used in the script file to ensure that the page is fully loaded before manipulations 
take place using jQuery.    
- [Jasmine Framework:](https://cdnjs.com/libraries/jasmine)  
    - The jasmine framework is used to to perform some jasmine tests on the toggle hide/reveal feature. It is also used 
to test that some json data exists and that values are positive. The jasmine framework files are loaded into the
index file.  

## Testing ##
Testing was mainly done by manually writing and running the code to view the output. The developer tool was used 
to inspect elements and apply styles for consideration. The elements section was used to inspect the div layout 
and to check on bootstrap styles that needed to be over-ridden. The console section was used to traverse the dom, 
to list the various elements to check classes and ids. This enabled non repetition when deriving new ids or classes 
and also sourced the position of redundant ones to be deleted. The application was tested on chrome, firefox and
microsoft edge and performed similarly across all 3 browsers.  
In relation to design responsiveness, some attempt was made in the initial design phase to create flexible wrappers 
to fit the graphs. However this was abandoned as charts do not respond the same way as images do. However all divs 
were set up to be responsive and it was felt the best way to produce a dashboard suitable to all screen sizes was 
to omit certain graphs as the screen width decreased. (**Aside** In a real world situation a client or feedback 
from users may not choose this option, but in the context of this project, adopting this option presented other 
challenges to use css and javascript to manipulate elements within the dom, as described in the paragraphs below).    
The dashboard will behave as expected on screens larger in width (in the 1200px region). It should look and work 
reasonably well on iPad pro and iPad screen sizes as an effort was made to stack columns so charts could fit the 
screen size.  
For the iPad size screen it was decided to stack all chart divs to ensure good readability. As text and chart divs 
were set up with large screens in mind, it was necessary to relocate header and paragraph text to suit the graphs, 
for the iPad size, using jQuery. A media query handles styles for the header and paragraph text.    
For the smaller screen widths from 766 to 400px, media queries were used to omit the wide graphs and in screen 
widths below 400px the pie charts (and corresponding text fields) were also omitted. Rather than use jQuery to 
amend associated text, css styles linked to classes, were applied within the media queries in the form of display 
none and display block to present appropriate text for the shown chart. It was found that jQuery was overwriting 
styles applied to elements at previous window sizes. The css method provides a simple and efficient solution to 
this problem.   
It had been considered to use the replace.with method to modify text paragraphs on screen resize but the text 
method was found to be a more effective solution as the replace method was removing data from the dom that was 
needed when the screen width increased again. There were limitations to this method also, as previous elements 
were being overwritten despite using different class names. This was resolved by using css, as described above. 
It was also considered to use the add.class and remove.class method to apply styles to the elements. However for 
this particular project the css styles in the stylesheet were adequate and encumbering the project with extra 
jQuery methods in this context was deemed not necessary.  
Styles were added through the console for viewing, but once adopted were copied into the css style sheet.    
Some jasmine tests are applied to the criteria key legend section which shows or hides on button click and to verify
that some of the json data exists and thast values are positive.
While testing the examGend and passGend/fail functions with jasmine, calling these functions within the test was 
giving an undefined error. As the original functions are scoped within the deriveGraphs function it was decided 
to use another approach. The json file was loaded into the testSpec file and the data relating to the previously 
mentioned functions then tested. Using this approach ensured that function scope was not an issue and if the data 
passed the test then there is no issue with the functions that use this data.

## Deployment ##
The repo for this application is available at https://github.com/vmcggh18/fed_dashboard.  
The repo can be downloaded as a zip for installation into a local ide. When installed locally just select the 
home page and click run to view in the browser.      
Alternatively the application can be viewed as a github page at https://vmcggh18.github.io/fed_dashboard/

## Credits ##

### Content ###
- [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)  
Creative commons license for the chosen dataset.  
### Media ###
- [The dataset source](https://data.gov.ie/dataset)  
Published by the Department of Education and Skills.  

### Acknowledgements ###
- Code Institute:  
I received inspiration for this project through following the tutorials from Code Institute, in particular Module 
5, Interactive Frontend Development.  
- [jQuery](https://api.jquery.com/)  
The jQuery API documentation was consulted in relation to window resize and text methods, loading json data and 
mouse methods.      
- [Jasmine](https://jasmine.github.io/2.0/introduction.html)  
The jasmine documentation was consulted in relation to syntax for testing javascript code.  
- [Tutorialspoint](https://www.tutorialspoint.com/dcjs/dcjs_introduction_to_crossfilter.htm)  
The tutorialspoint dc.js Introduction to crossfilter tutorial was consulted during this project to get an overview
of crossfilter.
