const HEIGHT = 600;
const WIDTH = 600;

const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var _xScale, _yScale, _svg;

var data = [0,1,2,3,4,5,6,7,8,9,10];

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
    return _yScale(((3 * (Math.sin(q))) + 5) / 10) ;
};

var generateArea = function (curve) {
    var area = d3.area()
                 .x(cxOperation)
                 .y0(INNER_HEIGHT)
                 .y1(cyOperation)
                 .curve(curve);

     var line = d3.line()
        .x(cxOperation)
        .y(cyOperation)
        .curve(curve);

    _svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'random_area')
        .append('path')
        .attr("d", area(data));

    _svg.append('g')
    .attr('transform', translate(MARGIN, MARGIN))
    .attr('class', 'random_line')
    .append('path')
    .attr("d", line(data));
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

var generateChart = function (curve, name) {
    _svg = d3.select('.chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    _svg.append('text')
        .attr('class','heading')
        .attr('x',WIDTH/2)
        .attr('y',20)
        .text(name);    

    _xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, INNER_WIDTH]);

    _yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([INNER_HEIGHT, 0]);

    generateAxis();
    generateArea(curve);
    generateCircles();
};

generateChart(d3.curveLinearClosed, 'curveLinearClosed');
generateChart(d3.curveStepAfter, 'curveStepAfter');
generateChart(d3.curveBasisOpen, 'curveBasisOpen');
generateChart(d3.curveCardinalClosed, 'curveCardinalClosed');
generateChart(d3.curveBasis, 'curveBasis');