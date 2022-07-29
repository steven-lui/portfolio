//https://emailregex.com/
let fnameRegex, snameRegex, subjectRegex, messageRegex, emailRegex;
emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
fnameRegex = snameRegex = /^[a-zA-Z ]+$/;
//https://stackoverflow.com/questions/31543641/validate-a-sentence-or-a-paragraph
subjectRegex = messageRegex = /^/;

function sendForm() {
    //https://stackoverflow.com/questions/4291005/jquery-get-all-input-from-specific-form
    //iterate each input
    $(".form .form-control:not(#message)").each(function () {
        var input = $(this); //object this iteration
        let id = input.attr("id");
        let pattern = eval(input.attr("id") + "Regex"); //regex pattern for this tag

        //input sanatised
        if (pattern.test(input.val())) {
            //remove required since its been added
            if (input.hasClass("required")) {
                input.removeClass("required");
                $(`label[for="${id}"]`).remove();
            }
            console.log(input.val());
            //add to form object
            //send via email
        }
        //input not sanitised
        else {
            //add required class if not already
            if (!input.hasClass("required")) {
                input.addClass("required");
                input.before(`<label for="${id}" style="color:red;"}">Please fill out this field`);
            }
        }
    });
}

//reset form text
//https://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method
$(function () {
    $(".form")[0].reset();
});