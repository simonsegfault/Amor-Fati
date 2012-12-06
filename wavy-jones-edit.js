var WavyJones = function (context, elem) {
	var analyser = context.createAnalyser();

	analyser.width = document.getElementById(elem).offsetWidth;
	analyser.height = document.getElementById(elem).offsetHeight;
	analyser.lineColor = 'yellow';
    analyser.lineColor2 = 'blue';
	analyser.lineThickness = 10;

    var paper = Raphael(elem, analyser.width, analyser.height),
        oscLine = paper.path([['M', 0, analyser.height/2], ['L', analyser.width, analyser.height/2], 'Z']),
        oscLine2 = paper.path([['M', 0, analyser.height/2 - 15], ['L', analyser.width, analyser.height/2-15], 'Z']),
        noDataPoints = 10,
		freqData = new Uint8Array(analyser.frequencyBinCount);

    oscLine.attr({stroke: analyser.lineColor, 'stroke-width': analyser.lineThickness});
    oscLine2.attr({stroke: analyser.lineColor2, 'stroke-width': analyser.lineThickness});

    var drawLine = function () {
        analyser.getByteTimeDomainData(freqData);

        var graphPoints = [],
            graphPoints2 = [],
            graphStr2 = '',
            graphStr = '';

        graphPoints.push('M0, ' + (analyser.height/2));
        graphPoints2.push('M0, ' + (analyser.height/2));

        for (var i = 0; i < freqData.length; i++) {
            if (i % noDataPoints) {
                var point = (freqData[i] / 128) * (analyser.height / 2);
                var point2 = (freqData[i] / 128) * (analyser.height / 2) - 15;
                graphPoints.push('L' + i + ', ' + point); 
                graphPoints2.push('L' + i + ', ' + point2); 
            }
        }

        for (i = 0; i < graphPoints.length; i++) {
            graphStr += graphPoints[i];
            graphStr2 += graphPoints2[i];
        }

        oscLine.attr('stroke', analyser.lineColor);
        oscLine.attr('stroke-width', analyser.lineThickness);
        oscLine.attr('path', graphStr);
        oscLine2.attr('stroke', analyser.lineColor2);
        oscLine2.attr('stroke-width', analyser.lineThickness);
        oscLine2.attr('path', graphStr2);

        setTimeout(drawLine, 70);
    };

    drawLine();

    return analyser;
};
