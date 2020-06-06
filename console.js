var cursor = {
    x: 0,
    y: 0,
    object: document.getElementById("cursor")
};

var text_area = document.getElementById("console");

function keyInput(event) {
    console.log(event.keyCode);
    var character = String.fromCharCode(event.keyCode);
    console.log(character);

    text_area.innerHTML += character;
    moveCursor(1, 0);
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