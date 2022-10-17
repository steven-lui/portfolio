/**
 * Update each section/article if it is within the threshold
 * Show if it is, hide otherwise
 */
function update_sections() {
    // Iterate through each section OR articles (see examples.html) in the main
    $('main section, main section article').each(function () {
        // top and bottom of section
        var top = $(this).position().top;
        var bot = $(this).position().top + $(this).outerHeight();
        // thresholds are a smaller section of the window height to check if either ends of the section is in view
        // the middle third is the threshold
        var window_third = $(window).height() / 3;
        var top_threshold = $(window).scrollTop() + window_third;
        var bot_threshold = $(window).scrollTop() + (2 * window_third);

        /**
         * Check if all of the item is not in the threshold
         */
        ((top > bot_threshold && bot > bot_threshold) || (top < top_threshold && bot < top_threshold)) ?
            $(this).stop(true).animate({ 'opacity': '0' }, 500) : // show if true
            $(this).stop(true).animate({ 'opacity': '1' }, 500); // hide if false
    });
}

// https://codepen.io/annalarson/pen/AegVzq
// page ready
$(document).ready(function () {
    // set position to top
    $(window).scrollTop(0);

    // run at start of page once
    update_sections();
});

// on page scroll
$(window).scroll(function () {
    // run check on sections, now we know the scroll direction
    update_sections();
});