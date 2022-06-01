var data = [25, 20, 15, 10, 5];
var height = 400

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", height);
    
var rects = svg.selectAll("rect")
        .data(data)


rects.enter()
    .append("rect")
	.attr("x", (d) =>{return d;})
	.attr("y", height-40)
	.attr("width", 40)
	.attr("height", (d) =>{return d;})
	.attr("fill","red");