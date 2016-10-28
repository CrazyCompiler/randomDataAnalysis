const WIDTH = 490;
const HEIGHT = 470;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var defaultData=[];

var next = function(){
	return Math.floor((Math.random() * 100))
};

while(defaultData.length<10){
	defaultData.push(0);
};

var _xScale, _yScale, _line, _barChartXSCale, _barChartYScale, _barWidth, _interval;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var createInitialChart = function (divClass) {
	var svg = d3.select(divClass).append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);


	_xScale = d3.scaleLinear()
		.domain([0,defaultData.length-1])
		.range([0, INNER_WIDTH]);

	_yScale = d3.scaleLinear()
		.domain([0,100])
		.range([INNER_HEIGHT, 0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	var yAxis = d3.axisLeft(_yScale).ticks(10);

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis)
		.classed('xAxis', true);

	svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('yAxis', true)
		.call(yAxis);

	return svg;

}

var generateLineChart = function(svg){

	svg.append("defs")
		.append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", INNER_WIDTH)
		.attr("height", HEIGHT);

	svg.selectAll('.xAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', 0)
		.attr('y2', -INNER_HEIGHT)
		.classed('grid', true);

	svg.selectAll('.yAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', INNER_WIDTH)
		.attr('y2', 0)
		.classed('grid', true);

	_line = d3.line()
		.x(function(q,i){return _xScale(i)})
		.y(function(q){return _yScale(q)});

	var g = svg.append('g')
		.attr("clip-path", "url(#clip)")
		.attr('transform',  translate(MARGIN, MARGIN))
		.attr('class','random_path');
};

var updateLineChart = function(data) {
	d3.select('.random_path path').remove();
	d3.select('.random_path ')
		.append('path')
		.attr("d", _line(data))
		.attr("transform", null)
		.transition()
		.duration(785)
		.ease(d3.easeLinear)
		.attr("transform", "translate(" + _xScale(-1) + ",0)")
};

var generateBarChart = function (svg, data) {

	_barWidth = INNER_WIDTH/data.length-10;

	_barChartXSCale = d3.scaleLinear()
		.domain([0,data.length])
		.range([MARGIN, INNER_WIDTH]);

	_barChartYScale =  d3.scaleLinear()
		.domain([0,100])
		.range([INNER_HEIGHT, 0]);

	var bars = svg.append("g")
		.attr("class","barChart")
		.selectAll('rect')
		.data(data);

	bars.enter()
		.append('rect')
		.attr("x",function (d,i) { return _barChartXSCale(i)})
		.attr("y",function (d) { return _barChartYScale(d)})
		.attr("height",function (d) { return INNER_HEIGHT-(_yScale(d))})
		.attr("width", _barWidth)
		.attr("transform",translate(MARGIN,MARGIN));

	svg.selectAll('.xAxis .tick').remove();
};

var updateBarChart = function (data) {
	d3.selectAll('.barChart rect')
		.data(data)
		.attr("x",function (d,i) { return _barChartXSCale(i)})
		.attr("y",function (d) { return _barChartYScale(d)})
		.attr("height",function (d) { return INNER_HEIGHT-(_yScale(d))})
		.attr("width", _barWidth)
		.attr("class","bar")
		.attr("transform",translate(MARGIN,MARGIN));
};

var renderChart = function() {
	_interval = setInterval(function(){
		defaultData.push(next());
		updateLineChart(defaultData);
		updateBarChart(defaultData);
		defaultData.shift();
	}, 800);
};

window.onload = function() {
	var lineChartSvg =  createInitialChart(".lineChart");
	generateLineChart(lineChartSvg, defaultData);
	var barChartSvg = createInitialChart(".barChart");
	generateBarChart(barChartSvg, defaultData);
	renderChart();
};

var pause = function () {
	clearInterval(_interval);
};
