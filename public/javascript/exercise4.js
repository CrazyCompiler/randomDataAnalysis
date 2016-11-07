var generateRow = function (table,data,scale,rowType) {
    table.append('tr')
        .selectAll(rowType)
        .data(data).enter()
        .append(rowType)
        .text(function(d) { return scale(d); });
};

var noOperation = function (x) {
    return x;
};

var roundFigOfLog = function (x) {
    var scaleLog = d3.scaleLog().base(Math.E);
    return d3.format("d")(scaleLog(x));
}

var generateChart = function () {
    var data = [1,2,3,4,5,6,7,8,9,10];

    var table = d3.select('.chart').append('table');
    generateRow(table,data,noOperation,'th');
    generateRow(table,data,noOperation,'td');
    generateRow(table,data,d3.scalePow().exponent(2),'td');
    generateRow(table,data,d3.scaleLog().base(Math.E),'td');
    generateRow(table,data,roundFigOfLog,'td');
};

window.onload = function() {
    generateChart();
};


