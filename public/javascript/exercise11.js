const HEIGHT = 600;
const WIDTH = 600;

const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var _xScale, _yScale, _svg;

var data = [0,1,2,3,4,5,6,7,8,9];

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var generateAxis = function () {
    var x = d3.axisBottom(_xScale).ticks(10);
    var y = d3.axisLeft(_yScale).ticks(10);

    _svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(x)
        .classed('xAxis', true);

    _svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('yAxis', true)
        .call(y);
};

var cxOperation = function (q,i) { 
    return _xScale(i)
}; 

var cyOperation = function (q) { 
    return _yScale((Math.sin(3*q)+1)/2) 
};

var generateLine = function (tension) {
    var line = d3.line()
        .x(cxOperation)
        .y(cyOperation)
        .curve(d3.curveCardinal.tension(tension));

    var g = _svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'random_path')
        .append('path')
        .attr("d", line(data))
};

var generateCircles = function () {
    var g = _svg.append('g')
            .attr('class','circle')
            .attr('transform', translate(MARGIN, MARGIN));

    g.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('r', 4)
    .attr('cx', cxOperation)
    .attr('cy', cyOperation);
};

var generateChart = function (curveTension) {
    _svg = d3.select('.chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    _xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, INNER_WIDTH]);

    _yScale = d3.scaleLinear()
        .domain([0, 1.0])
        .range([INNER_HEIGHT, 0]);

    generateAxis();
    generateLine(curveTension);
    generateCircles();
};

var tensionScale = d3.scaleLinear()
    .domain([0,4])
    .range([-2, 1]);

for(var i = 0; i < 5; i++){
    generateChart(tensionScale(i));
}

