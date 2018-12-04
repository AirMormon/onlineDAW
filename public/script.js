// $(function () {
    // var socket = io.connect('http://localhost:3000');


    // console.log('yo')
//     $('form').submit(function(){
//       socket.emit('chat message', $('#m').val());
//       $('#m').val('');
//       return false;
//     });

//     socket.on('chat message', function(msg){
//   $('#messages').append($('<li>').text(msg));
// });
//   });

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

var seconds = 0
var newSeconds = 0;
var stream = MediaRecorder.stream
var songNotes

c4.addEventListener('click', playNote(c4, 261.63, "c4"))
db4.addEventListener('click', playNote(db4, 277.18, "db4"))
d4.addEventListener('cick', playNote(d4, 293.66, "d4"))
eb4.addEventListener('click', playNote(eb4, 311.13, "eb4"))
e4.addEventListener('click', playNote(e4, 329.63, "e4"))
f4.addEventListener('click', playNote(f4, 349.23, "f4"))
gb4.addEventListener('click', playNote(gb4, 369.99, "gb4"))
g4.addEventListener('click', playNote(g4, 392.00, "g4"))
ab4.addEventListener('click', playNote(ab4, 415.30, "ab4"))
a4.addEventListener('click', playNote(a4, 440.00, "a4"))
bb4.addEventListener('click', playNote(bb4, 466.16, "bb4"))
b4.addEventListener('click', playNote(b4, 493.88, "b4"))
c5.addEventListener('click', playNote(c5, 523.25, "c5"))
pl.addEventListener('click', playSong);
r.addEventListener("click", recSong);
submit.addEventListener("click", subSong);
delBut.addEventListener('click', delNotes)
var input = document.getElementById('input')

function noscroll() {
    window.scrollTo( 0, 0 );
  }
  
  // add listener to disable scroll
  window.addEventListener('scroll', noscroll);

input.onblur = function () {
    var name = document.getElementById('input').value;
    var data = {"name":name}
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

function playNote(note, frequency, key) {
    var name = document.getElementById('input').value;
  
    var held = 0
    var PutDownTime
    var PickUpTime
    var context = new AudioContext;
    var gainNode = context.createGain();
    var oscillator;
    note.addEventListener('mousedown', function () {
        PutDownTime = seconds;
        //console.log(PutDownTime)
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        gainNode.gain.value = 1;
        oscillator.type = "triangle";
        oscillator.frequency.value = frequency
        gainNode.connect(context.destination);
        oscillator.start(0)
    });
    note.addEventListener('mouseup', function () {
        PickUpTime = seconds;
       // console.log(held)
        //gainNode.gain.exponentialRampToValueAtTime(0.000000001, context.currentTime + 4)
        oscillator.stop();
        if (recording == 1) {
            notes.push({
                "freq": frequency,
                "timeon": PutDownTime,
                "timeoff": PickUpTime
            })
           // console.log(notes)
        } else {}
    })


}


function recSong() {
    var name = document.getElementById('input').value
    if (name == ""){

        alert('Please Enter a Song Title')
    }else{
        
    seconds = 0;
    recording = -recording
    var start
    var elapsed
    if (recording == 1) {
        delNotes();
        document.getElementById("recBanner").innerHTML = "Recording"
         time = setInterval(incrementSeconds, 1);
         start = new Date().getTime();
        // yup = setInterval(displayStuff,1000)
         int = setInterval(display, 1000);
    }
        function incrementSeconds() {
            elapsed = new Date().getTime() - start;
            seconds = elapsed/1000
            // document.getElementById("recBanner").innerHTML = "Recording"
            // // if (document.getElementById("recBanner").innerHTML.length = 9){
            //     document.getElementById("recBanner").innerHTML += "."
            // }
        }
       
        function display() {
            if ((document.getElementById("recBanner").innerHTML += '.').length == 13) 
            document.getElementById("recBanner").innerHTML = 'Recording';
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
    if (name == ""){
        alert('Please Enter a Song Title')
    }else{
    recSong();
    
    document.getElementById("recBanner").innerHTML = ""
    var title = document.getElementById('input').value
    var xhttp = new XMLHttpRequest();
    var contents = {
        title,
        notes
    }
    var arrStr = JSON.stringify(contents)
    xhttp.open("POST", "/data");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(arrStr);
    //console.log(contents);
            };
}

function delNotes(){
    var name = document.getElementById('input').value

    if (name == ""){
        alert('Please Enter a song title')
        
            }else{
var request = new XMLHttpRequest
request.open("POST", "/del");
request.send();

}
}


function playSong() {
    var name = document.getElementById('input').value
    if (name == ""){
        alert('Please Enter a song title')
        
            }else{
    var note
    var hold
    var request = new XMLHttpRequest();
    request.open("GET", '/respo', true)
    request.addEventListener('load', function () {
    songNotes = JSON.parse(this.response);
    songNotes.forEach(function (val) {
            var note = val.notes;
            note.forEach(function (val){
                var context = new AudioContext;
                
            var oscillator;
            var gainNode = context.createGain();
             gainNode.gain.value = 1;
              
              var timeon = val.timeon;
              var freq = val.freq
              var off = val.timeoff
             
                oscillator = context.createOscillator();
                oscillator.connect(gainNode);
                oscillator.type = "triangle";
                oscillator.frequency.value = freq
                gainNode.connect(context.destination);
                oscillator.start(timeon)
                oscillator.stop(off)
                
            })
            
            
    })
    //console.log(songNotes)
   
    })

    request.send();
}
}



socket.on('chat message', function (msg){
    console.log(msg)
})




