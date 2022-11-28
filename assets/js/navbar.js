function toggleMenu() {
    $(".hamburger").toggleClass("is-active");

    //show when active
    if ($(".hamburger").hasClass("is-active")) {
        $("nav").slideDown();
        $(".burger").css("margin-left", $("nav").width());

        //dark background
        $("main").prepend(`<div class="black-out d-lg-none">`);
    }
    //hide when inactive
    else {
        $("nav").slideUp();
        $(".burger").css("margin-left", 0);

        //remove dark background
        $(".black-out").remove();
    }
}

$(document).ready(function () {
    //remove d-none from nav and keep hidden
    //this stops the menu from flashing on load
    $("nav").hide().removeClass("d-none");

    //on menu button click
    $(".hamburger").on("click", function (e) {
        toggleMenu();
    });
});

//https://stackoverflow.com/questions/1403615/use-jquery-to-hide-a-div-when-the-user-clicks-outside-of-it
$(document).mouseup(function (e) {
    //nav is visible (menu is active)
    //outside of nav (x position right of width)
    //not menu button
    if ($(".hamburger").hasClass("is-active") && e.pageX > $("nav").width() && !$(".burger").find("*").is(e.target)) {
        toggleMenu();
    }
});