const HEIGHT = 600;
const WIDTH = 600;

const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

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

var generateLine = function (xScale, yScale, container, data) {
    var line = d3.line()
        .x(function (q, i) { return xScale(i)} )
        .y(function (q) { return yScale(q) });

    var g = container.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'random_path')
        .append('path')
        .attr("d", line(data));
};

var generateCircles = function (xScale, yScale, container, data ) {
    var g = container.append('g')
            .attr('class','circle')
            .attr('transform', translate(MARGIN, MARGIN));

        g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('r', 4);

    var circles = g.selectAll('circle');

    circles.attr('cx', function(q,i){return xScale(i)})
        .attr('cy', function(q){return yScale(q)});
}

var getXValues = function () {
    var xNodes = d3.selectAll('.xAxis text')._groups[0];
    var values = [];

    var elements = Array.apply(null, xNodes);

    elements.forEach(function (value) {
        values.push(value.innerHTML);
    });
    return values;
};

var generateChart = function () {
    var svg = d3.select('.chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    var xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, INNER_WIDTH]);

    var yScale = d3.scaleLinear()
        .domain([0, 1.0])
        .range([INNER_HEIGHT, 0]);

    generateAxis(xScale, yScale, svg);
    generateLine(xScale, yScale, svg, data);

    var xValues = getXValues();

    var sinValues = xValues.map(function (value) {
        return (Math.sin(value)/10)+0.5;
    })

    generateLine(xScale, yScale, svg, sinValues);
    generateCircles(xScale, yScale, svg, data);
    generateCircles(xScale, yScale, svg, sinValues);


};

generateChart();
