const WIDTH = 600;

const defaultData = [
    {name:'ramesh',subject:'maths',score:87},
    {name:'suresh',subject:'maths',score:45},
    {name:'pokemon',subject:'english',score:65},
    {name:'mary',subject:'kannada',score:44},
    {name:'riya',subject:'science',score:72},
    {name:'katie',subject:'social studies',score:82},
    {name:'katie',subject:'maths',score:98},
    {name:'ramesh',subject:'bengali',score:25},
    {name:'suresh',subject:'science',score:55},
    {name:'riya',subject:'tamil',score:75},
    {name:'pokemon',subject:'sports',score:95},
    {name:'pokemon',subject:'social studies',score:32}
];

var subjects = [];

var colors = d3.scaleOrdinal(d3.schemeCategory10);

var generateLegend = function () {
    d3.select(".legend").selectAll('div')
        .data(subjects)
        .enter().append('div')
        .style("background",function (d) { return colors(d) })
        .text(function (d) { return d; });

    d3.select(".legend").selectAll('div').exit().remove();

}

var renderChart = function(data){
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data,function (d) { return d['score'] })])
        .range([0, WIDTH]);

    var div = d3.select(".chart").selectAll('div')
        .data(data);

    div.enter().append('div')
        .style("width",function (d) { return xScale(d['score'])+"px"; })
        .style("background",function (d) { return colors(d.subject); })
        .text(function (d) { return d['name'] + " " + d['score']; });

    div.exit().remove();
};

window.onload = function() {

    defaultData.forEach(function (element) {
        if(subjects.indexOf(element.subject) < 0)
            subjects.push(element.subject);
    })

    renderChart(defaultData);
    generateLegend();
};

var sortData = function (sortBy) {
    d3.selectAll('.chart div')
        .sort(function (a,b) { return d3.ascending(a[sortBy],b[sortBy]);})
        .transition().duration(500);

    d3.selectAll('.chart div').exit().remove();
}


