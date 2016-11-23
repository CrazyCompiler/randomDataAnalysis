const HEIGHT = 600;
const WIDTH = 600;

const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var data = [{x:0,y:0.5},{x:1,y:0.9},{x:2,y:0.7},{x:3,y:0.5},{x:4,y:0.3},{x:6, y:0.4},{x:7 ,y:0.2},{x:8 ,y:0.3},{x:9, y:0.2}];

var _xScale, _yScale, _svg;

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var generateAxis = function (xScale, yScale) {
    var x = d3.axisBottom(xScale).ticks(10);
    var y = d3.axisLeft(yScale).ticks(10);

    _svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(x)
        .classed('xAxis', true);

    _svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('yAxis', true)
        .call(y);
};

var generateLine = function (data, line) {
    var g = _svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'random_path')
        .append('path')
        .attr("d", line(data))
};

var generateCircles = function (data, cxOperation, cyOperation) {
    var g = _svg.append('g')
            .attr('class','circle')
            .attr('transform', translate(MARGIN, MARGIN));

        g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('r', 4);

    var circles = g.selectAll('circle');

    circles.attr('cx', cxOperation)
        .attr('cy', cyOperation);
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

var getSinValues = function () {
    var nodeList = _svg.selectAll('.xAxis .tick>text')._groups[0];
    var elements = Array.apply(null, nodeList); 
    var sinValues = [];
    elements.forEach(function (element, index) {
        sinValues.push({'x':index,'y':Number(element.innerHTML)});
    });
    return sinValues;
}

var generateChart = function (curve, name) {
    _svg = d3.select('.chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    _svg.append("text")
        .attr('class','heading')
        .attr('x',WIDTH/2)
        .attr('y',20)
        .text(name);

    _xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, INNER_WIDTH]);

    _yScale = d3.scaleLinear()
        .domain([0, 1.0])
        .range([INNER_HEIGHT, 0]);

    var simpleLine = d3.line()
        .x(function (q) { return _xScale(q.x)} )
        .y(function (q) { return _yScale(q.y) })
        .curve(curve);

    var sinLine = d3.line()
        .x(function (q) { return _xScale(q.x)} )
        .y(function (q) { return _yScale(getSinValue(q.x)) })
        .curve(curve);

    generateAxis(_xScale, _yScale);
    generateLine(data, simpleLine);
    generateCircles(data, cxOperation, cyOperation);

    var sinData = getSinValues();

    generateLine(sinData,sinLine);
    generateCircles(sinData, cxOperation, cySinOperation);

};

generateChart(d3.curveLinear, 'curveLinear');
generateChart(d3.curveLinearClosed, 'curveLinearClosed');
generateChart(d3.curveStepAfter, 'curveStepAfter');
generateChart(d3.curveBasis, 'curveBasis');
generateChart(d3.curveBundle, 'curveBundle');
generateChart(d3.curveCardinal, 'curveCardinal');
generateChart(d3.curveCardinalClosed, 'curveCardinalClosed');
generateChart(d3.curveCatmullRom, 'curveCatmullRom');