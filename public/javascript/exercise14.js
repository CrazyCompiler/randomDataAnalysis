const WIDTH = 700;
const HEIGHT = 700;
const radius = Math.min(WIDTH,HEIGHT) / 2;
const MARGIN = 30;

var data = [1, 1, 2, 2, 1, 2, 1];

var _svg;

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var generateChart = function (curve, name) {
    _svg = d3.select('.chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    var color = d3.scaleOrdinal()
        .range(["#1F77B4", "#AEC7E8", "#FF7F0E", "#FFBB78", "#2CA02C", "#98DF8A", "#D62728"]);

    var g = _svg.append("g")
            .attr("transform", translate(WIDTH / 2 ,HEIGHT / 2));

    var pie = d3.pie()
                .sort(null)
                .value(function(d) { return d});

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

   g.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr("d", arc)
        .style('fill', function (d, i) {
            return color(i)
        })
     
        


};

generateChart();
