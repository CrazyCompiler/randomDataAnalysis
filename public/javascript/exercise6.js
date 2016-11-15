const WIDTH = 600;
const HEIGHT = 100;
const figureHeight = 100;
const figureWidth = 100;
const INITIAL = 0;

var translate = function (index) {
    return "translate(" + index * 150 + "," + 0 + ")";
}

var getGroupElement = function (container, index, type) {
    var g = container.append('g')
        .attr('class', 'element ' + type)
        .attr('transform', translate(index));

    return g;
}

var generateLine = function (container, index) {
    var g = getGroupElement(container, index, 'line');

    g.append('line')
        .attr('x1', figureWidth)
        .attr('y1', INITIAL)
        .attr('x2', INITIAL)
        .attr('y2', figureHeight)
};

var generateCircle = function (container, index) {
    var g = getGroupElement(container, index, 'circle');

    g.append('circle')
        .attr('cx', figureWidth / 2)
        .attr('cy', figureHeight / 2)
        .attr('r', figureHeight / 2);
};

var generateRect = function (container, index) {
    var g = getGroupElement(container, index, 'rect');

    g.append('rect')
        .attr('x', INITIAL)
        .attr('y', INITIAL)
        .attr('width', figureWidth)
        .attr('height', figureHeight);
};

var generateTriangle = function (container, index) {
    var g = getGroupElement(container, index, 'triangle');

    var firstPoint = INITIAL + ',' + figureHeight;
    var secondPoint = figureWidth/2 + ',' + INITIAL;
    var thirdPoint = figureWidth + ',' + figureHeight;

    g.append('polygon')
        .attr('points',firstPoint+', '+secondPoint+', '+thirdPoint);
}

var generateChart = function () {
    var figuresGenerators = [generateLine, generateCircle, generateRect, generateTriangle]

    var container = d3.select('.chart')
        .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    figuresGenerators.forEach(function (generate, index) {
        generate(container, index);
    })

};

generateChart();
