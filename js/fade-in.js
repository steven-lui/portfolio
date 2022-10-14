/**
 * Run the check if each section scrolls into the threshold
 * Displays the section if it passes the checks
 * @param {integer} scroll_dir 
 */
function update_sections(scroll_dir) {
    // Iterate through each section in the main
    $('main section').each(function () {
        // top and bottom of section
        var top = $(this).position().top;
        var bot = $(this).position().top + $(this).outerHeight();

        // thresholds are a smaller section of the window height to check if either ends of the section is in view
        // the middle third is the threshold
        var window_third = $(window).height() / 3;
        var top_threshold = $(window).scrollTop() + window_third;
        var bot_threshold = $(window).scrollTop() + (2 * window_third);

        /**
         * show on scroll down: top enters bot_threshold
         * hide on scroll down: bottom leaves top_threshold
         * show on scroll up: bottom enters top_threshold
         * hide on scroll up: top leaves bot_threshold
         * show on start: if section is on page
         */
        switch (scroll_dir) {
            // scroll down
            case -1:
                // show
                if (top > bot_threshold) display_section(this, true);
                // hide
                // else if (bot < top_threshold) display_section(this, false);
                break;
            // scroll up
            case 1:
                // show
                if (bot < top_threshold) display_section(this, true);
                // hide
                // else if (top > bot_threshold) display_section(this, false);
                break;
            // page start
            default:
                display_section(this, bot <= $(window).height());
                break;
        }
    });
}

/**
 * Show/hide section on page
 * @param {object} section 
 * @param {boolean} show 
 */
function display_section(section, show) {
    show ?
        $(section).animate({ 'opacity': '1' }, 1500) : // show if true
        $(section).animate({ 'opacity': '0' }, 1500); // hide if false
}

// https://codepen.io/annalarson/pen/AegVzq
// page ready
$(document).ready(function () {
    // set position to top
    $(window).scrollTop(0);

    // last recorded position on the page
    var lastPos = 0;
    // scroll direction, up is positive
    var scroll_dir = 0;

    // one time check to make sections visible on page load
    update_sections(0);

    // on page scroll
    $(window).scroll(function () {
        // new position on the page
        var currentPos = $(window).scrollTop();

        // scroll direction, scroll is positive
        scroll_dir = currentPos > lastPos ? -1 : 1;
        console.log(scroll_dir);

        // update position on page
        lastPos = currentPos;

        // run check on sections, now we know the scroll direction
        update_sections(scroll_dir);
    });
});