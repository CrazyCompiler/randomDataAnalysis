
var getValues =  function () {
    var data = [];
    for(var i = 0; i <= 10; i++){
        data.push(i);
    };
    return data;
};

var generateChart = function () {

    var fontSizeScale = d3.scaleLinear()
        .domain([0,10])
        .range(['italic bold 12px/30px Georgia, serif','italic bold 120px/180px Georgia, serif']);

    var value = getValues();
    d3.select('.chart')
        .selectAll('div')
        .data(value).enter()
        .append('div')
        .style("font",function (d) {console.log(fontSizeScale(d));return fontSizeScale(d);})
        .text(function (d) { return d;})
};

window.onload = function() {
    generateChart();
};


