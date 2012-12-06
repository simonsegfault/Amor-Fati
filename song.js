 var context = new webkitAudioContext(),
         myOsc = new WavyJones(context,'o'),
        buffer;

    var playAudioFile = function (buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(myOsc);
        myOsc.connect(context.destination);
        
        source.noteOn(0); // Play sound immediately
    };

    var loadAudioFile = (function (url) {
        var request = new XMLHttpRequest();

        request.open('get', 'Simon Segfault - Amor Fati.mp3', true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
                context.decodeAudioData(request.response,
                     function(incomingBuffer) {
                         playAudioFile(incomingBuffer);
                     }
                );
        };

        request.send();
    }());
