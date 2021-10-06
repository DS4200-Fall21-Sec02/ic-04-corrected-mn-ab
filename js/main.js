
// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 50,
    left: 100,
    right: 100,
    bottom: 100
  },
  width = 1000,
  height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  barPadding = .2;
  axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

  d3.csv('https://raw.githubusercontent.com/DS4200-Fall21-Sec02/ic-04-corrected-mn-ab/main/data/data.csv').then((data, error) => {
    if (error) throw error;
    // console.log(data);
  
    data.forEach(d => {
      d.X = d.X;
      d.Y = +d.Y;
    });

  // Create a select dropdown
  const mySelection = document.getElementById("drop_down");

  d3.select(mySelection).append("span").append("p").attr("class", "label").text("How should these bars sorted?").style("font-weight", "bold").style("color", "red").style("font-size", "25px");

  const selectItems = ["Alphabetically", "Ascendingly", "Descendingly"];

  // Create a drop down
  d3.select(mySelection)
    .append("span")
    .append("select")
    .attr("id", "selection")
    .attr("name", "tasks")
    .selectAll("option")
    .data(selectItems)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);

  // When the page loads, the chart which sorted alphabetically loads by default
  document.addEventListener("DOMContentLoaded", myChart()); 

  // Chart changes based on drop down selection
  d3.select("#selection").on("change", function() {
    const selectedOption = d3.select(this).node().value;
    if (selectedOption == "Ascendingly") {
      data.sort((a,b) => {
        return d3.ascending(a.Y, b.Y)
      }) 
    } else if (selectedOption == "Descendingly") {
      data.sort((a,b) => {
        return d3.descending(a.Y, b.Y)
      })
    } else if (selectedOption == "Alphabetically") {
      data.sort((a,b) => {
        return d3.ascending(a.X, b.X)
      })
    }
    myChart();
  })

  function myChart () {
    // Append SVG to this DIV
    const chartDIV = document.createElement("div");

    // Create scales
    const xScale = d3.scaleBand()
    .domain(data.map((d) => d.X))
    .rangeRound([0, innerWidth])
    .paddingInner(0.05);

    const yScale = d3.scaleLinear()
      .domain([0,d3.max(data, d => d.Y)]).nice()
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom().scale(xScale);

    const yAxis = d3.axisLeft().scale(yScale);

    const svg = d3.select(chartDIV)
      .append("svg")
      .attr("viewBox", [0,0,width,height]);

    const mainG = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const g = mainG
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", `translate(15,0)`);

    g.append("rect")
      .attr("class", "bars")
      .attr("x", d => xScale(d.X) - innerWidth/data.length/2)
      .attr("y", d => yScale(d.Y))
      .attr("width", innerWidth/data.length-1.5)
      .attr("height", (d) => innerHeight - yScale(d.Y))
      .attr("fill", d => d.Y == d3.max(data, d => d.Y) ? "#F07910" : "red")
      .append("text")
        .attr("x", 5*3)
        .attr("y", (d,i) => i*5)
        .text(d => d.Y);

    mainG
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${innerHeight})`);

    mainG
      .append("g")
      .call(yAxis);

    // This code will redraw charts based on dropdown selection. At any point in time, chartContainer DIV only contains one chart. The charts are recycled.
    const showChart = document.getElementById("d3-container");
    while (showChart.firstChild) {
      showChart.firstChild.remove();
    }
    showChart.appendChild(chartDIV);

  }
  })

  // first visualization
let svg1 = d3.select('#vis1')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
.attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
.style('background-color', '#ccc') // change the background color to light gray
.attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
.attr("height", height)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`)

// Load data from csv 
let data = d3.csv("https://raw.githubusercontent.com/DS4200-Fall21-Sec02/ic-04-corrected-mn-ab/main/data/population_spain.csv")
data.then(function(data) {

  // Legend definition
  // For each range of age (bar) we create a dot and text element 
  // For each circle we add an x and y position, a radius value and the color for each of them
  svg1.append("circle").attr("cx",360).attr("cy",-20).attr("r", 6).style("fill", "#003f5c")
  svg1.append("circle").attr("cx",360).attr("cy",10).attr("r", 6).style("fill", "#7a5195")
  svg1.append("circle").attr("cx",360).attr("cy",40).attr("r", 6).style("fill", "#ef5675")
  svg1.append("circle").attr("cx",360).attr("cy",70).attr("r", 6).style("fill", "#db8f00")
  // For each text we add an x and y position, a text value, the size of the text, its alignment and color for each of them
  svg1.append("text").attr("x", 380).attr("y", -20).text("Range 1: 16 to 19 years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#003f5c")
  svg1.append("text").attr("x", 380).attr("y", 10).text("Range 2: 20 to 24 years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#7a5195")
  svg1.append("text").attr("x", 380).attr("y", 40).text("Range 3: 25 to 54 years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#ef5675")
  svg1.append("text").attr("x", 380).attr("y", 70).text("Range 4: 55 and above years old").style("font-size", "12px").attr("alignment-baseline","middle").style("fill", "#db8f00")

// Axis limitations for placement inside the viewBox 
// For the x axis we take into account the width and margin for an accurate placement
var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
var xScale1 = d3.scaleBand()
// For the y axis we take into account the height and bottom margin
var yScale = d3.scaleLinear().range([height - margin.bottom, 0])

// Axis ticks alignment for x and y axis
var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

// Axis tags and domains, we set the year values for the x axis and inside the bars representing the age ranges, and a simple range for y representing the percentage
xScale0.domain(data.map(d => d.Year))
xScale1.domain(['Range1', 'Range2','Range3','Range4']).range([0, xScale0.bandwidth()])
yScale.domain([0, 80])

// With the next piece of code we add the year values into the graph
var Year = svg1.selectAll(".Year")
.data(data)
.enter().append("g")
.attr("class", "Year")
.attr("transform", d => `translate(${xScale0(d.Year)},0)`);

// Add field1 bars 
// For each value of the first column we include a class, color, x and y position, width and height attributes
// Also, for an interactive experience we have included a function to show the information when the user places the mouse over a bar element
Year.selectAll(".bar.Range1")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range1")
.style("fill","#003f5c")
.attr("x", d => xScale1('Range1'))
.attr("y", d => yScale(d.Range1))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
return height - margin.bottom - yScale(d.Range1)
}).append('title') // Tooltip
  .text(function (d) { return 'Age Range: 16-19 yo' +
                         '\nPercentage Employed: ' + d.Range1 + '%' + 
                          '\n Year: ' + d.Year});

// Add field2 bars 
// Same attributes as for field1
Year.selectAll(".bar.Range2")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range2")
.style("fill","#7a5195")
.attr("x", d => xScale1('Range2'))
.attr("y", d => yScale(d.Range2))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
return height - margin.bottom - yScale(d.Range2)
}).append('title') // Tooltip
  .text(function (d) { return 'Age Range: 20-24 yo' +
                         '\nPercentage Employed: ' + d.Range2 + '%' + 
                          '\n Year: ' + d.Year});

// Add field3 bars 
// Same attributes as for field1
Year.selectAll(".bar.Range3")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range3")
.style("fill","#ef5675")
.attr("x", d => xScale1('Range3'))
.attr("y", d => yScale(d.Range3))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
return height - margin.bottom - yScale(d.Range3)
}).append('title') // Tooltip
  .text(function (d) { return 'Age Range: 25-54 yo' +
                         '\nPercentage Employed: ' + d.Range3 + '%' + 
                          '\n Year: ' + d.Year});

// Add field4 bars 
// Same attributes as for field1
Year.selectAll(".bar.Range4")
.data(d => [d])
.enter()
.append("rect")
.attr("class", "bar Range4")
.style("fill","#db8f00")
.attr("x", d => xScale1('Range4'))
.attr("y", d => yScale(d.Range4))
.attr("width", xScale1.bandwidth())
.attr("height", d => {
return height - margin.bottom - yScale(d.Range4)
}).append('title') // Tooltip
  .text(function (d) { return 'Age Range: 55+ yo' +
                         '\nPercentage Employed: ' + d.Range4 + '%' + 
                          '\n Year: ' + d.Year});

// Add the x axis and set the correct placement
svg1.append("g")
   .attr("class", "x axis")
   .attr("transform", `translate(0,${height - margin.bottom})`)
   .call(xAxis);
// Add the y axis 
svg1.append("g")
   .attr("class", "y axis")
   .call(yAxis);

// We have created this two next pieces of code for the axis labels using class, text-anchor, font size and text attributes
svg1.append("text")
   .attr("text-anchor", "end")
   .attr("x", 180)
   .attr("y", 410)
   .attr('class', 'axisLabel')
   .style("font-size", "15px")
   .text("Year");


svg1.append("text")
   .attr("text-anchor", "end")
   .attr("y", -50)
   .attr("x", -100)
   .attr("dy", ".75em")
   .attr('class', 'axisLabel')
   .style("font-size", "15px")
   .attr("transform", "rotate(-90)")
   .text("Population percentage");

// Title of the plot using the same approach as above
svg1.append("text")
 .attr("x", 170)
 .attr("y", -20)
 .attr("text-anchor", "middle")
 .style("font-size", "22px")
 .style("font-weight", "bold")
 .text("Spanish Employment Rates");
})

// second visualization
let svg2 = d3.select('#vis2')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
.attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
.style('background-color', '#ccc') // change the background color to light gray
.attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

// read Data
let iris = d3.csv("https://raw.githubusercontent.com/DS4200-Fall21-Sec02/ic-04-corrected-mn-ab/main/data/Iris.csv")
// present viz
iris.then(function(data) {
// Discrete Color Scale
let colorScale = {
  "Iris-setosa": "red",
  "Iris-versicolor": "green",
  "Iris-virginica": "blue"
}
// Dictionary with category name formatted
let speciesFormatted = {
  "Iris-setosa": "Iris setosa",
  "Iris-versicolor": "Iris versicolor",
  "Iris-virginica": "Iris virginica"
}
// scales relative to the data they contain 
var xScale = d3.scaleLinear()
  .domain([
    d3.min(data,function (d) { return d.PetalWidthCm })-0.1,
    d3.max(data,function (d) { return d.PetalWidthCm })
    ])
  .range([margin.left,width - margin.right])
var yScale = d3.scaleLinear()
  .domain([
    d3.min(data,function (d) { return d.SepalLengthCm })-0.1,
    d3.max(data,function (d) { return d.SepalLengthCm })
    ])
  .range([height - margin.bottom,0])
// create svg group holding the viz
var g = svg2.append('g')
    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
// viz title
g.append("text")
 .attr("x", width/2)
 .attr("y", -20)
 .attr("text-anchor", "middle")
 .style("font-size", "22px")
 .style("font-weight", "bold")
 .text("Size of Iris Species");
// x-axis
var xAxis = d3.axisBottom(xScale);
// y-axis
var yAxis = d3.axisLeft(yScale);
// points
var points = g.selectAll('circle')
    .data(data)
    .enter()
  .append('circle')
    // center coordinates
    .attr('cx',function (d) { return xScale(d.PetalWidthCm) })
    .attr('cy',function (d) { return yScale(d.SepalLengthCm) })
    // radius
    .attr('r',7.5)
    // given point class assignment
    .attr('class','point')
    // overwrite .point fill with specified colors in dictionary
    .style('fill',function (d,i) { return colorScale[d.Species] })
    // point selected
    .on('mouseover', function () {
      d3.select(this)
        .transition()
        .duration(500)
        // apply .selected point class
        .attr('class','selected')
        .attr('stroke-width',2)
    })
    // point unselected
    .on('mouseout', function () {
      d3.select(this)
        .transition()
        .duration(500)
        // restore previous class
        .attr('class', 'point')
        .attr('stroke-width',1)
    })
  // Tooltip
  .append('title')
  .text(function (d) { return 'Species: ' + speciesFormatted[d.Species] +
                         '\nPetal Width: ' + d.PetalWidthCm +
                         '\nSepal Length: ' + d.SepalLengthCm });
                         
// x-axis
g.append('g')
    .attr('class','axis')
    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
    .call(xAxis)
// x-axis Label
g.append('text')
    //given class
    .attr('class','axisLabel')
    .attr('y',height)
    .attr('x',width/2+margin.left)
    .attr('dy','.6em')
    .style('text-anchor','end')
    .text('Petal Width')
// y-axis
g.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + (margin.left) + ', 0)')
    .call(yAxis)
// y-axis Label
g.append('text')
    // given class
    .attr('class','axisLabel')
    .attr('transform','rotate(-90)')
    .attr('x',-width/2+margin.top)
    .attr('y',0)
    .attr('dy','1em')
    .style('text-anchor','end')
    .text('Sepal Length')
})


