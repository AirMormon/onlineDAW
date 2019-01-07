var socket = io.connect('http://localhost:5000');

var recording = -1;
var notes = []

var time
var c4 = document.getElementById('cbutton')
var db4 = document.getElementById('dbbutton')
var d4 = document.getElementById('dbutton')
var eb4 = document.getElementById('ebbutton')
var e4 = document.getElementById('ebutton')
var f4 = document.getElementById('fbutton')
var gb4 = document.getElementById('gbbutton')
var g4 = document.getElementById('gbutton')
var ab4 = document.getElementById('abbutton')
var a4 = document.getElementById('abutton')
var bb4 = document.getElementById('bbbutton')
var b4 = document.getElementById('bbutton')
var c5 = document.getElementById('hcbutton')
var r = document.getElementById('recButton')
var pl = document.getElementById('playButton')
var sto = document.getElementById('stopButton')
var banner = document.getElementById('recBanner')
var submit = document.getElementById('subButton')
var delBut = document.getElementById('delButton')
var met = document.getElementById('met')
var select = document.getElementById('select')
var tempo = document.getElementById('tempo')
var instrument = 'piano'
metr = -1;
var x = 0;
var y 
var seconds = 0
var newSeconds = 0;
var stream = MediaRecorder.stream
var songNotes
var color;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(0, 40, 500, 150);
ctx.fillStyle = "grey";
ctx.fill();


select.onchange = function () {
    instrument = this.value;
    console.log(instrument)
}

c4.addEventListener('click', playPiano(c4, 261.63, "c4", "kick"))
db4.addEventListener('click', playPiano(db4, 277.18, "db4"))
d4.addEventListener('cick', playPiano(d4, 293.66, "d4", "snare"))
eb4.addEventListener('click', playPiano(eb4, 311.13, "eb4"))
e4.addEventListener('click', playPiano(e4, 329.63, "e4", "hat"))
f4.addEventListener('click', playPiano(f4, 349.23, "f4"))
gb4.addEventListener('click', playPiano(gb4, 369.99, "gb4"))
g4.addEventListener('click', playPiano(g4, 392.00, "g4"))
ab4.addEventListener('click', playPiano(ab4, 415.30, "ab4"))
a4.addEventListener('click', playPiano(a4, 440.00, "a4"))
bb4.addEventListener('click', playPiano(bb4, 466.16, "bb4"))
b4.addEventListener('click', playPiano(b4, 493.88, "b4"))
c5.addEventListener('click', playPiano(c5, 523.25, "c5"))
pl.addEventListener('click', playSong);
r.addEventListener("click", recSong);
submit.addEventListener("click", subSong);
delBut.addEventListener('click', delNotes)
met.addEventListener('click', metronome)
var input = document.getElementById('input')

// function noscroll() {
//     window.scrollTo(0, 0);
// }





// add listener to disable scroll
//window.addEventListener('scroll', noscroll);

input.onblur = function () {
    var name = document.getElementById('input').value;
    var data = {
        "name": name
    }
    var arrStr = JSON.stringify(data)
    request = new XMLHttpRequest
    request.open("POST", "/name", true)
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(arrStr);
    //console.log(name)
}

context = new AudioContext;
oscillator = context.createOscillator();

oscillator.connect(context.destination);




function save() {

    alert('you left')


}


// const audioCtx = new AudioContext();

// audioElement = document.getElementById('audio')
// const track = audioCtx.createMediaElementSource(audioElement);
// track.connect(audioCtx.destination);

function playPiano(note, frequency, key, drum) {


    if (instrument == "piano") {
        var name = document.getElementById('input').value;
        var held = 0
        var PutDownTime
        var PickUpTime
        var context = new AudioContext;
        var gainNode = context.createGain();
        var oscillator;

        note.addEventListener('mousedown', function () {


            if (instrument == "piano") {
                var synth = new Tone.Synth().toMaster();
                synth.triggerAttackRelease(frequency, "8n");
                y = 107 - ((frequency-261)/4);
                color = "green"
            }
            if (instrument == "drums") {
                PutDownTime = seconds;
                y = 120;

                audioElement = document.getElementById(drum + "Audio")
                audioElement.play();
                color = "blue"
            }

            if(recording ==1){

                x = seconds*5
                var c = document.getElementById("canvas");
                var ctx = c.getContext("2d");
                ctx.beginPath();
                ctx.rect(x, y, 2, 10);
                ctx.fillStyle = color;
                ctx.fill();
            }


        });
        note.addEventListener('mouseup', function () {
            PickUpTime = seconds;
            PutDownTime = seconds;

            if (recording == 1) {
                if (instrument == "piano") {
                    notes.push({
                        "freq": frequency,
                        "drum": "",
                        "timeon": PutDownTime,
                        "timeoff": PickUpTime
                    })
                }

                if (instrument == "drums") {
                    notes.push({
                        "freq": "",
                        "drum": drum,
                        "timeon": PutDownTime,
                        "timeoff": PickUpTime
                    })
                }
                console.log(notes)
            } else {}



        })

    }
}




function metronome() {
audioElement = document.getElementById("metronome")
temp = 60000/tempo.value;

metr = -metr

console.log(metr)

if(metr == 1){
ss = setInterval(playMet,temp)
}

if(metr == -1){
clearInterval(ss)
//audioElement.stop();
}


    function playMet(){
    audioElement.play();
    }
}

function recSong() {

    var name = document.getElementById('input').value
    if (name == "") {

        alert('Please Enter a Song Title')
    } else {

        seconds = 0;
        recording = -recording
        var start
        var elapsed
        if (recording == 1) {
            playSong();
            document.getElementById("recBanner").innerHTML = "Recording"
            time = setInterval(incrementSeconds, 1);
            start = new Date().getTime();
            // yup = setInterval(displayStuff,1000)
            int = setInterval(display, 1000);
        }

        function incrementSeconds() {
            elapsed = new Date().getTime() - start;
            seconds = elapsed / 1000
            // document.getElementById("recBanner").innerHTML = "Recording"
            // // if (document.getElementById("recBanner").innerHTML.length = 9){
            //     document.getElementById("recBanner").innerHTML += "."
            // }
        }

        function display() {
            if ((document.getElementById("recBanner").innerHTML += '.').length == 13) {
                document.getElementById("recBanner").innerHTML = 'Recording';
            }
            //clearInterval( int ); // at some point, clear the setInterval
        }

        if (recording == -1) {
            clearInterval(time)
            clearInterval(int)
            //document.getElementById("recBanner").innerHTML = ""
            seconds = 0;
            //console.log(elapsed)
        }
    }
}

function subSong() {
    var name = document.getElementById('input').value
    if (name == "") {
        alert('Please Enter a Song Title')
    } else {
        recSong();
        var contents
        document.getElementById("recBanner").innerHTML = ""
        var title = document.getElementById('input').value
        var xhttp = new XMLHttpRequest();
        if (instrument == "piano") {
            contents = {
                title,
                notes
            }
        }
        if (instrument == "drums") {
            contents = {
                title,
                notes
            }
        }
        var arrStr = JSON.stringify(contents)
        xhttp.open("POST", "/data");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(arrStr);
        //console.log(contents);
    };
}

function delNotes() {
    var name = document.getElementById('input').value

    if (name == "") {
        alert('Please Enter a song title')

    } else {
        var request = new XMLHttpRequest
        request.open("POST", "/del");
        request.send();
    }
}





function playSong() {
    var name = document.getElementById('input').value
    if (name == "") {
        alert('Please Enter a song title')

    } else {
        socket.emit('oo')
        var note
        var hold
        var request = new XMLHttpRequest();
        request.open("GET", '/respo', true)
        request.addEventListener('load', function () {
            songNotes = JSON.parse(this.response);
            songNotes.forEach(function (val) {
                var note = val.notes;
                note.forEach(function (val) {
                    if (val.freq != "") {
                        var pianoTime = val.timeon * 1000
                        setTimeout(playPiano, pianoTime)
                        var time = val.timeon*5
                        function playPiano() {
                            //console.log(pianoTime)
                            var synth = new Tone.Synth().toMaster();
                            synth.triggerAttackRelease(val.freq, "8n");
                            var c = document.getElementById("canvas");
                        var ctx = c.getContext("2d");
                        ctx.beginPath();
                        ctx.rect(time, 107-((val.freq-261)/4), 2, 10);
                        ctx.fillStyle = "green";
                        ctx.fill();
                        //console.log("asdfasdf")
                        //console.log(val.timeon)
                        }

                        
                    }

                    var drumTime = val.timeon * 1000
                    setTimeout(playStuff, drumTime)

                    function playStuff() {
                        if (val.drum != "") {
                            audioElement = document.getElementById(val.drum + "Audio")
                            audioElement.play();
                            var c = document.getElementById("canvas");
                        var ctx = c.getContext("2d");
                        ctx.beginPath();
                        ctx.rect(val.timeon*5, 120, 2, 10);
                        ctx.fillStyle = "red";
                        ctx.fill();
                        //console.log("asdfasdf")
                        console.log(val.timeon)
                        } else {}

                    }



                })


            })
            //console.log(songNotes)

        })

        request.send();
    }
}

// socket.on('chat message', function (msg) {
//     console.log(msg)
// })