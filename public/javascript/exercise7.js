const HEIGHT = 600;
const WIDTH = 700;

const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var initialData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var data = [0.5, 0.9, 0.7, 0.5, 0.3, 0.35, 0.4, 0.2, 0.3, 0.2];

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

var generateLine = function (xScale, yScale, container, data, curveAs) {
    var line = d3.line()
        .x(function (q, i) { return xScale(i)} )
        .y(function (q) { return yScale(q) })
        .curve(curveAs);


    var g = container.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'random_path')
        .append('path')
        .attr("d", line(initialData));

        g.transition()
        .duration(800)
            .attr("d", line(data))
};

var generateCircles = function (xScale, yScale, container, data ) {
    var g = container.append('g')
            .attr('class','circle')
            .attr('transform', translate(MARGIN, MARGIN));

        g.selectAll('circle').data(initialData)
        .enter().append('circle')
        .attr('r', 4);

    var circles = g.selectAll('circle');

    circles.attr('cx', function(q,i){return xScale(i)})
        .attr('cy', function(q){return yScale(q)});

    circles.data(data).transition()
        .duration(800)
        .delay(500)
        .attr('cx', function(q,i){return xScale(i)})
        .attr('cy', function(q){return yScale(q)});
}

var getXValues = function () {
    var xNodes = d3.selectAll('.xAxis text')._groups[0];
    var values = [];

    var elements = Array.apply(null, xNodes);

    elements.forEach(function (value) {
        values.push(value.innerHTML);
    });
    values.pop();
    return values;
};

var generateChart = function (curveAs, name) {
    var svg = d3.select('.chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('x', WIDTH/2)
        .attr('y', 10)
        .attr('class','curveName')
        .text(name);

    var xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, INNER_WIDTH]);

    var yScale = d3.scaleLinear()
        .domain([0, 1.0])
        .range([INNER_HEIGHT, 0]);

    generateAxis(xScale, yScale, svg);
    generateLine(xScale, yScale, svg, data, curveAs);

    var xValues = getXValues();

    var sinValues = xValues.map(function (value) {
        return (Math.sin(value)/10)+0.5;
    })

    generateLine(xScale, yScale, svg, sinValues, curveAs);
    generateCircles(xScale, yScale, svg, data);
    generateCircles(xScale, yScale, svg, sinValues);


};

generateChart(d3.curveLinear, 'Curve Linear');
generateChart(d3.curveLinearClosed, 'Curve Linear Closed');
generateChart(d3.curveBasis, 'Curve Basis');
generateChart(d3.curveStepAfter, 'Curve Step After');
generateChart(d3.curveLinearClosed, 'Curve Linear Closed');
generateChart(d3.curveCatmullRom, 'Curve CatmullRom');



