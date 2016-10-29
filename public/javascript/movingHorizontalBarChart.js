const WIDTH = 600;
const HEIGHT = 600;

var defaultData=[];

var next = function(){
	return Math.floor((Math.random() * 100))
};

while(defaultData.length<10){
	defaultData.push(next());
};

var _interval, _xScale, colors;

var generateBarChart = function () {

	_xScale = d3.scaleLinear()
		.domain([0, d3.max(defaultData)])
		.range([0, WIDTH]);

	colors = d3.scaleLinear()
		.domain([0, d3.max(defaultData)])
		.range(["#b0c4de","#4682B4"]);

	d3.select(".barChart")
		.style("width",WIDTH)
		.style("height",HEIGHT);

};

var updateBarChart = function () {
	var div = d3.select(".barChart").selectAll('div')
		.data(defaultData,function (d) { return d});

	div.enter().append('div')
		.style("width",function (d) { return _xScale(d)+"px"; })
		.style("background",function (d) { return colors(d) })
		.text(function (d) { return d; });

	div.exit().remove();
};

var renderChart = function() {
	_interval = setInterval(function(){
		defaultData.push(next());
		updateBarChart();
		defaultData.shift();
	}, 1000);
};

window.onload = function() {
	generateBarChart();
	renderChart();
};

