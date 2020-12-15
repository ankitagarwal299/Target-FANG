const text = 'My viewers on the Twitch are the best!!';

let index = 0;

function writeText() {
    document.body.innerHTML = text.slice(0, index);
    index++;

    //reset again
    if (index > text.length) {
        index = 0;
    }
}

setInterval(() => {
    writeText()
}, 100);
