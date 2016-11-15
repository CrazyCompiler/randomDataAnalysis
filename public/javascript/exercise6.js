const WIDTH = 600;
const HEIGHT = 100;
const figureHeight = 100;
const figureWidth = 100;
const INITIAL = 0;

var generateChart = function () {
    var svg = d3.select('.chart')
                .append('svg')
                .attr('width', WIDTH)
                .attr('height', HEIGHT);

    svg.append('line')
        .attr('x1', figureWidth)
        .attr('y1', INITIAL)
        .attr('x2', INITIAL)
        .attr('y2', figureHeight)
        .attr('stroke','brown')
        .attr('stroke-width',2);

    svg.append('circle')
        .attr('cx',figureWidth*2)
        .attr('cy',HEIGHT/2)
        .attr('r',HEIGHT/2)
        .attr('fill','none')
        .attr('stroke','red')
        .attr('stroke-width',2);

    svg.append('rect')
        .attr("x", figureWidth*3)
        .attr("y", INITIAL)
        .attr("width", figureWidth)
        .attr("height", figureHeight)
        .attr('fill','none')
        .attr('stroke','blue')
        .attr('stroke-width',2);



};

window.onload = generateChart();
