const SerialPort = require("serialport");

const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 115200
});

port.on('data', function(data) {
    print_to_console(data);
});

SerialPort.list().then(
    ports => {
        console.log(ports);
    },
    err => {
        console.error('Error listing ports', err)
    }
);

var cursor = {
    x: 0,
    y: 0,
    object: document.getElementById("cursor")
};

var text_area = document.getElementById("terminal");

function print_to_console(data) {
    console.log(data);
    var text = new TextDecoder("utf-8").decode(data);
    text_area.innerHTML += text;
    moveCursor(text.length, 0);
    window.scrollTo(0, document.body.scrollHeight);
}

function keyInput(event) {
    var character;
    var code = (event.keyCode ? event.keyCode : event.which);
    if (code == 13) { //Enter keycode
        character = "\r\n"
    } else {
        character = String.fromCharCode(event.keyCode);
    }
    console.log(`Write ${character}`);
    port.write(character, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written')
    });
}

function keySpecial(event) {
    if (event.key == "Backspace") {
        console.log("Delete");
        moveCursor(-1, 0);
    }
}

function moveCursor(x, y) {
    // Make sure cursor does not go under 0
    cursor.x = (cursor.x + x > 0) ? cursor.x + x : 0;
    cursor.y = (cursor.y + y > 0) ? cursor.y + y : 0;

    updateCursorPosition();
}

function updateCursorPosition() {
    cursor.object.style.top = cursor.y + 'ch';
    cursor.object.style.left = cursor.x + 'ch';
}

updateCursorPosition();

window.onfocus = function() {
    cursor.object.style.borderStyle = "none";
    cursor.object.style.animation = "blink 1s linear infinite alternate";
};

window.onblur = function() {
    // Make cursor look like it's not active
    cursor.object.style.animation = "";
    cursor.object.style.borderStyle = "solid";
};