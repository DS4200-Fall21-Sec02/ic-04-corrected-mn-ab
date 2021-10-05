
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
      .attr("fill", d => d.Y == d3.max(data, d => d.Y) ? "#f4c430" : "green")
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


