function startTimer(duration, button) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    var previous_text = button.textContent
    var id_timer;

    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        button.textContent = minutes + ":" + seconds;

        if ((minutes == 0) && (seconds == 0)){
            button.disabled = false;
            button.textContent = previous_text;
            clearInterval(id_timer);
        }
    };

    if (duration != 0) {
        button.disabled = true;
        timer();
        id_timer = setInterval(timer, 1000);
    }
}

function DisableFiveMinutes(e1)
{
    var disabled_time = 60 * 5;
    startTimer(disabled_time, e1);
}

window.onload = function ()
{
    display = document.querySelector('#ButtonTimeout');
    startTimer(initial_time, display);
};
