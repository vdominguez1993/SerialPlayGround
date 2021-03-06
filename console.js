const SerialPort = require("serialport");

var port_select = document.getElementById("port");
var text_area = document.getElementById("terminal");
var pre_cursor = document.getElementById("terminal").childNodes[0];
var cursor = {
    object: document.getElementById("cursor")
};
var port = null;
/*
const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 115200
});

port.on('data', function(data) {
    print_to_console(data);
});

*/

function openClosePort() {
    var port_select = document.getElementById("port");
    if (port == null) {
        // Get the selected port
        var selected_port = port_select.value.split(" ")[0];
        console.log(selected_port);

        port = new SerialPort(selected_port, {
            autoOpen: false,
            baudRate: 115200
        });

        port.open(function(err) {
            if (err) {
                port = null;
                alert("Couldn't open port.\r\n" + err.message);
            } else {
                port.on('data', function(data) {
                    print_to_console(data);
                });
                document.getElementById("ConnectionStatus").textContent = "Close connection";
                port_select.disabled = true;
            }
        });

    } else {
        port.close();
        document.getElementById("ConnectionStatus").textContent = "Open connection";
        port_select.disabled = false;
        port = null;
        updatePortOptions();
    }
}

function updatePortOptions() {
    console.log("cacafuti");
    // Only when there is no port selected
    if (port == null) {
        SerialPort.list().then(
            ports => {
                port_select.options.length = 0;
                ports.forEach(function(port) {
                    var option_str = port.path + ((port.manufacturer == undefined) ? '' : ' ' + port.manufacturer);
                    var newOption = document.createElement("option");
                    newOption.text = option_str;

                    port_select.add(newOption);
                });
            },
            err => {
                console.error('Error listing ports', err)
            }).finally(setTimeout(updatePortOptions, 5000));
    }
}

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

    if (port) {
        port.write(character, function(err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
        });
    }
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

// Update the ports once per second
updatePortOptions();