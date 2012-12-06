var context = new webkitAudioContext(),
    oscillator = context.createOscillator(),
    myOsc = new WavyJones(context,'o');

oscillator.connect(myOsc);
myOsc.connect(context.destination);

//oscillator.connect(context.destination);
oscillator.type = 1;
oscillator.noteOn(0);

/*
sine = 0
square = 1
saw = 2
triangle = 3
*/

/*for(var i = 0;i<8;i++)
{
    oscillator.frequency.value = i*100;
}*/

