const HEIGHT = 600;
const WIDTH = 600;

const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var initialData = [{x:0,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6, y:1},{x:7 ,y:1},{x:8 ,y:1},{x:9, y:1}];
var data = [{x:0,y:0.5},{x:1,y:0.9},{x:2,y:0.7},{x:3,y:0.5},{x:4,y:0.3},{x:6, y:0.4},{x:7 ,y:0.2},{x:8 ,y:0.3},{x:9, y:0.2}];

var _xScale, _yScale;

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var generateAxis = function (xScale, yScale, container) {

    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    container.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    container.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('yAxis', true)
        .call(yAxis);
};

var generateLine = function (container, data, initialLine, line) {
    var g = container.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'random_path')
        .append('path')
        .attr("d", initialLine(initialData));

        g.transition()
        .duration(800)
        .attr("d", line(data))
};

var generateCircles = function (container, cxOperation, initialCYOperation,cyOperation) {
    var g = container.append('g')
            .attr('class','circle')
            .attr('transform', translate(MARGIN, MARGIN));

        g.selectAll('circle').data(initialData)
        .enter().append('circle')
        .attr('r', 4);

    var circles = g.selectAll('circle');

    circles.attr('cx', cxOperation)
        .attr('cy', initialCYOperation);

    circles.data(data).transition()
        .duration(800)
        .delay(800)
        .attr('cx',cxOperation)
        .attr('cy',cyOperation);
};

var getSinValue = function (value) {
    return (Math.sin(value)/10)+0.5;
};

var cxOperation = function (q) {
    return _xScale(q.x);
};

var cyOperation = function (q) {
    return _yScale(q.y);
};

var cySinOperation = function (q) {
    return _yScale(getSinValue(q.x));
};

var generateChart = function () {
    var svg = d3.select('.chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    _xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, INNER_WIDTH]);

    _yScale = d3.scaleLinear()
        .domain([0, 1.0])
        .range([INNER_HEIGHT, 0]);

    var simpleLine = d3.line()
        .x(function (q) { return _xScale(q.x)} )
        .y(function (q) { return _yScale(q.y) });

    var sinLine = d3.line()
        .x(function (q) { return _xScale(q.x)} )
        .y(function (q) { return _yScale(getSinValue(q.x)) });

    generateAxis(_xScale, _yScale, svg);
    generateLine(svg, data, simpleLine,simpleLine);
    generateCircles(svg, cxOperation, cyOperation, cyOperation);

    setTimeout(function(){
        generateLine(svg, data, simpleLine,sinLine);
        generateCircles(svg, cxOperation, cyOperation, cySinOperation);
    }, 500);


};

generateChart();
