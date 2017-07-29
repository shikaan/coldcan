//import * as html2canvas from 'html2canvas';
//var socket = io('http://pwd10-0-26-3-80.host1.labs.play-with-docker.com/');

var socket = io('http://localhost:3000/');

const id = setInterval(() => {
	html2canvas(document.body)
    .then((data) => {
        let parsed = data.toDataURL("image/png", 0.5);

        //Data to be sent to the backend
        socket.emit('video-chunk', parsed);
    })
    .catch((error) => console.log(error));
}, 1000);

setTimeout(() => {
	clearInterval(id);
}, 10000)