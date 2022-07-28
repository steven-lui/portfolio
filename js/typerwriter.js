$(function () {
    var i = 0;
    var txt = $("h1").text(); /* The text */
    var buffer = "";
    var speed = 75; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
        if (i < txt.length) {
            buffer += txt.charAt(i);
            $("h1").text(buffer);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});