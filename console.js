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
var pre_cursor = document.getElementById("terminal").childNodes[0];

function print_to_console(data) {
    // For each character
    data.forEach(character => {
        var char_string = String.fromCharCode(character);
        // Add it before the cursor
        pre_cursor.nodeValue += char_string;
    });

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

    port.write(character, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
    });
}

function keySpecial(event) {
    if (event.key == "Backspace") {
        // Send the corresponding backspace value
    }
}

window.onfocus = function() {
    cursor.object.style.outlineStyle = "none";
    cursor.object.style.animation = "blink 1s linear infinite alternate";
};

window.onblur = function() {
    // Make cursor look like it's not active
    cursor.object.style.animation = "";
    cursor.object.style.outlineStyle = "solid";
};