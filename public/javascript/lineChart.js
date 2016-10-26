const WIDTH = 670;
const HEIGHT = 670;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var defaultData = [0,0,0,0,0,0,0,0,0,0];

var _svg, _xScale, _yScale;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var generateChart = function(){
	_svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	_xScale = d3.scaleLinear()
		.domain([0,9])
		.range([0, INNER_WIDTH]);

	_yScale = d3.scaleLinear()
		.domain([0,100])
		.range([INNER_HEIGHT, 0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	var yAxis = d3.axisLeft(_yScale).ticks(10);

	_svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis)
		.classed('xAxis', true);

	_svg.selectAll('.xAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', 0)
		.attr('y2', -INNER_HEIGHT)
		.classed('grid', true);

	_svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('yAxis', true)
		.call(yAxis);

	_svg.selectAll('.yAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', INNER_WIDTH)
		.attr('y2', 0)
		.classed('grid', true);

	var g = _svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN));

	g.append('path')
		.classed('random_path', true);

};

var updateChart = function(data){
	var line = d3.line()
		.x(function(q){return _xScale(q['xAxis'])})
		.y(function(q){return _yScale(q['yAxis'])});

	var g = _svg.select('g')
	var path = g.select('path');

	_svg.select(".random_path")
		.attr("d", line(data));
};

var generateRandomData = function (data) {
	data.shift();
	data.push(Math.floor((Math.random() * 100) + 1));
	return data;
}

var renderChart = function() {
	var YAxisNumber = generateRandomData(defaultData);
	var data = [];
	YAxisNumber.forEach(function(currentValue,index){
		data.push({"yAxis": currentValue, "xAxis": index});
	});
	updateChart(data);
}

window.onload = function() {
	generateChart();
	setInterval(function(){
		renderChart();
	}, 2500);
};

