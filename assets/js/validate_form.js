/**
 * Appends text to the given error field
 * @param {text} field automatically appends '_error'
 * @param {text} text 
 */
function error_text(field, text) {
    $(`#${field}_error`).text(text);
}

let valid_fields = [];
valid_fields['fname'] = false;
valid_fields['sname'] = false;
valid_fields['email'] = false;
valid_fields['subject'] = false;
valid_fields['message'] = false;

function validate_name(field) {
    value = $(`#${field}`).val();
    // check for any data
    if (value == "") {
        valid_fields[field] = false;
        error_text(field, "Please complete this field");
    }
    // check for special characters
    //https://www.regextester.com/93648
    else if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
        valid_fields[field] = false;
        error_text(field, "No special characters");
    }
    // valid
    else {
        valid_fields[field] = true;
        error_text(field, "");
    }
}

function validate_email(field) {
    value = $(`#${field}`).val();
    // check for any data
    if (value == "") {
        valid_fields[field] = false;
        error_text(field, "Please complete this field");
    }
    // special characters
    else if (!value.match(/[A-Za-z0-9@]+$/)) {
        valid_fields[field] = false;
        error_text(field, "No special characters");
    }
    // @
    else if (!value.match(/^[^@]+@[^@]+$/)) {
        valid_fields[field] = false;
        error_text(field, "Must include only one @");
    }
    // split by @
    else {
        let chunks = value.split('@');
        let username = chunks[0];
        let domain = chunks[1];
        // username
        if (!username.match(/[A-Za-z0-9]+$/)) {
            valid_fields[field] = false;
            error_text(field, "Please check the first part of your email");
        }
        // domain
        // https://stackoverflow.com/questions/21173734/extracting-top-level-and-second-level-domain-from-a-url-using-regex
        else if (!domain.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/)) {
            valid_fields[field] = false;
            error_text(field, "Please check the second part of your email");
        }
        // valid
        else {
            valid_fields[field] = true;
            error_text(field, "");
        }
    }
}

function validate_text(field) {
    value = $(`#${field}`).val();
    // check for any data
    if (value == "") {
        valid_fields[field] = false;
        error_text(field, "Please complete this field");
    }
    // check for special characters
    else if (!value.match(/[A-Za-z0-9 _\-.,!?"'()\r\n]*/)) {
        valid_fields[field] = false;
        error_text(field, "No special characters");
    }
    // valid
    else {
        valid_fields[field] = true;
        error_text(field, "");
    }
}

/**
 * Checks that all fields are ready to send to the database
 * @returns boolean
 */
function validate_form() {
    /*     console.log(valid_fields);
        valid_fields.forEach(element => {
            // invalid, break
            if (!element) {
                alert("Error! Please check your details again");
                return false;
            }
        });
        return true; */
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

    // test vals
    // $(".form #fname").val("Steven");
    // $(".form #sname").val("Lui");
    // $(".form #email").val("admin@admin.com");
    // $(".form #subject").val("Dragée gummi bears jelly ice cream sesame snaps lemon drops.");
    // $(".form #message").val("Jelly-o!?! apple pie coready_fieldsie dessert (oat----cake caramels biscuit) pastry chocolate.. <Topping coready_fieldsie cupcake> bonbon chocolate cake tart!!!!! Tart cake tiramisu soufflé marzipan. Candy halvah cotton candy tiramisu chocolate cake powder soufflé chocolate bar donut. Icing sugar plum cake tiramisu brownie... Gummies pudding liquorice sweet roll carrot cake? Jelly shortbread chocolate bar biscuit tiramisu");
});