var margin = { left: 100, right: 10, top: 10, bottom: 100 }

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 600 + margin.right + margin.left)
    .attr("height", 400 + margin.top + margin.bottom);

var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    

d3.json("data/revenues.json").then((data)=> {
	console.log(data);

    revenue = d3.max(data, (d)=>{return d.revenue});
    building = data.map((d)=>{return d.month});

    var x = d3.scaleBand()
	    .domain(building)
	    .range([0,400])
	    .paddingInner(.3)
	    .paddingOuter(.3);

    var y = d3.scaleLinear()
	    .domain([0,revenue])
	    .range([400, 0]);

    var colors = d3.scaleOrdinal()
        .domain(building)
        .range(d3.schemeSet3);

    var rects = g.selectAll("rect")
        .data(data);
    
    
    rects.enter()
        .append("rect")
            .attr("x", (d) => {return x(d.month); })
            .attr("y", (d) => {return y(d.revenue);})
            .attr("height", (d) => {return 400 - y(d.revenue);})
            .attr("width", x.bandwidth)
            .attr("fill",(d) => {return colors(d.month);})

    var bottomAxis = d3.axisBottom(x);
        
    g.append("g")
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + 400 + ")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
    	.attr("transform", "rotate(-20)");

    var leftAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat((d) => {return "$" + d/1000 + "K";});
    
    g.append("g")
	    .attr("class", "left axis")
	    .call(leftAxis);

    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", (w / 2))
        .attr("y", h + 140)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(-120, -50)")
        .text("Month");
    
    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", -(400 / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Revenue (dlls.)");
}).catch((error)=>{
    console.log(error);
});