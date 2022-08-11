$(function () { //on load
    const speedMax = 400; //ms
    const speedMin = 50;

    //https://thewebdev.info/2022/02/09/how-to-create-pause-or-delay-in-a-javascript-for-loop/
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const typeWriter = async (e, txt) => {
        e.text("");
        for (const c of txt) {
            e.text(e.text() + c);
            await wait(rand(speedMin, speedMax));
        }
    }

    //Each typewriter element
    jQuery('.typewriter').each(function () {
        var element = $(this);
        const txt = element.text();
        typeWriter(element, txt);
    });
});