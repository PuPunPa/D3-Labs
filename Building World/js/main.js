var svg = d3.select("#chart-area").append("svg")
    .attr("width", 1000)
    .attr("height", 1000);
    

d3.json("data/buildings.json").then((data)=> {
	console.log(data);
    var sizey = 0
    data.forEach((d)=>{

	});

    var rects = svg.selectAll("rect")
            .data(data)

    rects.enter()
        .append("rect")
            .attr("x", (d, i) => { return (i*50); })
            .attr("y", 20)
            .attr("height", (d) => {return d.height;})
            .attr("width", 40)
            .attr("fill","blue");
            
}).catch((error)=>{
    console.log(error);
}).catch((error)=>{
    console.log(error);
});