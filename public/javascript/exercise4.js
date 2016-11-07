
var getValues =  function (startingValue,operation) {
    var data = [startingValue];
    for(var i = 1; i <= 10; i++){
        data.push(operation(i));
    };
    return data;
};

var generateRow = function (table,data,rowType) {
    table.append('tr')
        .selectAll(rowType)
        .data(data).enter()
        .append(rowType)
        .text(function(d) { return d; });
};

var noOperation = function (x) {
    return x;
};

var roundFigOfLog = function (x) {
    var scaleLog = d3.scaleLog().base(Math.E);
    return d3.format("d")(scaleLog(x));
}

var generateChart = function () {
    var table = d3.select('.chart').append('table');
    generateRow(table,getValues("Title",noOperation),'th');
    generateRow(table,getValues("n",noOperation),'td');
    generateRow(table,getValues("n square",d3.scalePow().exponent(2)),'td');
    generateRow(table,getValues("log(n)",d3.scaleLog().base(Math.E)),'td');
    generateRow(table,getValues("log(n) rounded",roundFigOfLog),'td');
};

window.onload = function() {
    generateChart();
};


