// @TODO: YOUR CODE HERE!
// Create Scatter Plot Table Between Two Variables...I am choosing Poverty vs. Obesity
// Define SVG Area Dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define Chart Margins
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

// Define Chart Area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate("+margin.left+","+margin.top+")");


var chartGroup = svg.append("g");
d3.select(".chart").append("div")
.attr("class", "tooltip").style("opacity", 0);
d3.csv("data.csv").then(function(demoData) {
    // console.log(demoData);
    // if (err) 
    // throw err;
    demoData.forEach(function(demoData){
        demoData.poverty=+demoData.poverty
        demoData.obesity=+demoData.obesity
    });

var xScale = d3.scaleLinear().range([chartHeight, 0])
var yScale = d3.scaleLinear().range([0, chartWidth])

var bottomAxis = d3.axisBottom(xScale)
var leftAxis = d3.axisLeft(yScale)

xScale.domain([7,d3.max(demoData, function(demoData){
    return +demoData.poverty
})])

yScale.domain([0, d3.max(demoData, function(demoData){
    return +demoData.obesity
})])

// var toolTip = d3.tip()
//                 .attr("class", "toolTip")
//                 .offset([80, -60])
//                 .html(function(demoData){
//                     var stateName = demoData.state;
//                     var poverty = +demoData.poverty;
//                     var obesity = +demoData.obesity;
//                     return (stateName+"Poverty %"+poverty+"Obesity"+obesity)
//                 });
//                 chartGroup.call(toolTip)
chartGroup.selectAll("circle")
.data(demoData)
.enter()
.append("circle")
.attr("cx", function(demoData, index){
    return yScale(demoData.poverty)
})
.attr("r", "20")
.attr("stroke", "black")
.attr("opacity", 0.8)
.attr("fill", "salmon")
.on("mouseover", function(demoData){
    toolTip.show(demoData, this)
})
.on("mouseout", function(demoData){
    toolTip.hide(demoData, this)
});
chartGroup.append("g").attr(`transform`,`translate(0,${chartHeight})`)
.call(bottomAxis)
chartGroup.append("g").call(leftAxis)
svg.selectAll(".state")
.data(demoData)
.enter()
.append("text")
.text(function(demoData){
    return demoData.abbr
})
.attr("x", function(demoData){
    return xScale(demoData.poverty)
})
.attr("y", function(demoData){
    return yScale(demoData.obesity)
})
.attr("font-size", "10px")
.attr("fill", "blue")
.style("text-anchor", "middle")
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0-margin.left+50)
.attr("x", 0-chartHeight/2)
.attr("dy", "lem")
.attr("class", "axisText")
.text("Obesity");

// X Axis Title
chartGroup.append("text")
.attr("transform", "translate("+chartWidth/2+","+(chartHeight+margin.top+30)+")",)
.attr("class", "axisText")
.text("Poverty")

});

