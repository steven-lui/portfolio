let regex = {
    //https://www.regextester.com/93648
    fname: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gm,
    sname: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gm,
    //https://emailregex.com/
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    //https://stackoverflow.com/questions/31543641/validate-a-sentence-or-a-paragraph
    subject: /.*/,
    message: /.*/
};

const checkError = errorArray => { if (errorArray.length != 0) throw errorArray; };

//https://www.sitepoint.com/jquery-strip-harmful-characters-string/
const replaceSpecialChars = str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        //.replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
        .replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
        .replace(/(^-+|-+$)/g, '') // Remove extra hyphens from beginning or end of the string
        //https://stackoverflow.com/questions/42728605/why-these-5-6-characters-are-considered-unsafe-html-characters
        .replace(/[&"'<>]/g, '');
};

//add a label to bad fields
const addRequired = input => {
    let placeholder = input.attr("placeholder");
    let string = `<label for="${input.attr("id")}" style="color:red;"}">Please fill out your ${placeholder.substring(0, placeholder.length - 1).toLowerCase()} correctly`;
    input.addClass("required");
    input.before(string);
};

function sendForm() {
    //remove all required labels here, add them back later
    $('.form-control:not("#message")').each(function () {
        let input = $(this); //object this iteration
        input.removeClass("required");
        $(`label[for=${input.attr("id")}]`).remove();
    });

    //array of errors
    let missing = [];

    try {
        //https://stackoverflow.com/questions/4291005/jquery-get-all-input-from-specific-form
        //fname, sname, email
        $(".form-control:not(#message):not(#subject)").each(function () {
            let input = $(this); //object this iteration
            let id = input.attr("id");
            let pattern = regex[id]; //regex pattern for this tag
            let value = replaceSpecialChars(input.val());

            //not sanitised
            if (!pattern.test(value)) {
                //label for warning
                addRequired(input);

                //add to error
                missing.push(`Error at ${id}: ${value} is not a good value`);
            }
            //input sanitised
            else if (pattern.test(value)) {
                console.log(`${id}: ${value}`);
            }
        });

        //check fname, sname, email for errors
        checkError(missing);

        //subject, message
        $("#message, #subject").each(function () {
            let input = $(this); //object this iteration
            // let id = input.attr("id");
            let value = input.val();

            //if there is an input
            if (value != "") {
                //split input into sentences
                let sentences = value.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);

                //validate each sentence
                sentences.forEach(s => {
                    s = replaceSpecialChars(s);
                    s.replace(/(\r\n|\n|\r)/gm, "");
                });
            }
        });

        //everything's valid!
        //PHP HERE
        console.log("Valid form, ready for PHP");

        //thank you message
        let name = replaceSpecialChars($("#fname").val());
        $(".thanks").text(`Thank you ${name}!`).slideDown().delay(2000).slideUp();

        resetForm();
    }
    catch (error) {
        error.forEach(element => {
            console.log(element);
        });
    }
}

//https://stackoverflow.com/questions/5371089/count-characters-in-textarea
$('#message').on("input", function () {
    //https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
    //resize
    this.style.height = "auto"; //shrink for deleted text
    this.style.height = (this.scrollHeight) + "px"; //grow for added text

    //character length
    var max = $(this).attr("maxlength");
    var cur = $(this).val().length;
    //update label with character count
    $(`label[for='message']`).text(cur >= max ? `Max characters` : `${cur} / ${max}`);
});

//DOES NOT INCLUDE HIDE THANKS
function resetForm() {
    $(".form")[0].reset();

    //https://stackoverflow.com/questions/36087612/reset-textarea-height-in-javascript
    $("#message").attr("style", "").val("");
    $("#message").css("style", "height:" + ($('#message')[0].scrollHeight) + "px;");
    $(`label[for='message']`).text(`0 / ${$('#message').attr("maxlength")}`);
}

//https://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method
$(function () {
    if ($(".form").length) {
        resetForm();
        //this is not in reset form as the banner will immediately hide otherwise
        $(".thanks").hide();
    }

    // test values
    // $(".form #fname").val("Steven");
    // $(".form #sname").val("Lui");
    // $(".form #email").val("admin@admin.com");
    // $(".form #subject").val("Dragée gummi bears jelly ice cream sesame snaps lemon drops.");
    // $(".form #message").val("Jelly-o!?! apple pie cookie dessert (oat----cake caramels biscuit) pastry chocolate.. <Topping cookie cupcake> bonbon chocolate cake tart!!!!! Tart cake tiramisu soufflé marzipan. Candy halvah cotton candy tiramisu chocolate cake powder soufflé chocolate bar donut. Icing sugar plum cake tiramisu brownie... Gummies pudding liquorice sweet roll carrot cake? Jelly shortbread chocolate bar biscuit tiramisu");
});