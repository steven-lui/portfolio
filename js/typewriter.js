$(function () { //on load
    const txt = $(".typewriter").text();
    const speedMax = 200; //ms
    const speedMin = 50;

    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    // function randomIntFromInterval(min, max) { // min and max included 
    //     return Math.floor(Math.random() * (max - min + 1) + min)
    // }
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    //https://thewebdev.info/2022/02/09/how-to-create-pause-or-delay-in-a-javascript-for-loop/
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const typeWriter = async () => {
        for (const c of txt) {
            $(".typewriter").text($(".typewriter").text() + c);
            await wait(rand(speedMin, speedMax));
        }
    }

    $(".typewriter").text("");
    typeWriter();
});