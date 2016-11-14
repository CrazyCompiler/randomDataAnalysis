var generateRow = function (table,title,data,scale,rowType) {

    data.unshift(title);

    var chart = table.append('tr')
        .selectAll(rowType)
        .data(data).enter()
        .append(rowType)
        .append("div")
        .attr("class","hide")
        .text( function(d,i) { if(i == 0) return d;   return scale(d); });

    data.shift();

};

var generateChart = function () {
    var data = [1,2,3,4,5,6,7,8,9,10];

    var table = d3.select('.chart').append('table');
    generateRow(table,"Title",data,d3.scaleLinear(),'th');
    generateRow(table,"n",data,d3.scaleLinear(),'td');
    generateRow(table,"n square",data,d3.scalePow().exponent(2),'td');
    generateRow(table,"log(n)",data,d3.scaleLog().base(Math.E),'td');
    generateRow(table,"log(n) rounded",data,d3.scaleLog().base(Math.E).rangeRound([0,2]),'td');





    var nodeList = table.selectAll(".hide")._groups[0];

    var elements = Array.apply(null, nodeList);

    elements.forEach(function (element, index) {
        var timeOut = 1000+(index*500);

        setTimeout(function () {
            d3.select(element)
                .attr("class","none")
        },timeOut);
    })



};

window.onload = generateChart;


