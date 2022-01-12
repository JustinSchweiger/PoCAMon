document.addEventListener("DOMContentLoaded", function () {
    const webcam = document.querySelector("#webcam");
    const canvas = document.getElementById("webcam-picture");
    let webcamIsOn = false;

    const settings = {
        video: {width: {min: 1280}, height: {min: 720}},
    };

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(settings).then(function (stream) {
            webcamIsOn = true;
            webcam.srcObject = stream;
        }).catch(console.log("Something went wrong!"));
    }

    const socket = io();

    setInterval(() => {
        if (webcamIsOn) {
            canvas.getContext('2d').drawImage(webcam, 0, 0, canvas.width, canvas.height);
            let image_data_url = canvas.toDataURL('image/jpeg');

            socket.emit('webcam-feed', image_data_url);
        }
    }, 10000)

    socket.on('result', (data) => {
        console.log(data);
    });
});