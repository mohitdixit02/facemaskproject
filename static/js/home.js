let video = document.getElementById('video_input');
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then((s) => {
        video.srcObject = s;
    })
} else {
    console.log('no');
}

let capture = document.getElementById('capture');
capture.addEventListener('click', () => {
    let canvas = document.getElementById('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    let url = canvas.toDataURL('image/jpeg', 1.0).replace(/^data:image\/jpeg;base64,/, "");
    postData(url).then((response) => {
        let message=document.getElementsByClassName('result');
        let target = message[0];
        target.innerText=`${response['prediction']}`;
    });
})

async function postData(img_url) {
    const response = await fetch(`/request/`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: img_url
    });
    return response.json();
}