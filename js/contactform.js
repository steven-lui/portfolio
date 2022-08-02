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

const checkError = errorArray => { if (errorArray.length != 0) throw `Error:${[...errorArray]} fields are incorrect`; };

//https://www.sitepoint.com/jquery-strip-harmful-characters-string/
const replaceSpecialChars = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        //.replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
        .replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
        .replace(/(^-+|-+$)/g, '') // Remove extra hyphens from beginning or end of the string
        //https://stackoverflow.com/questions/42728605/why-these-5-6-characters-are-considered-unsafe-html-characters
        .replace(/[&"'<>]/g, '');
};

const addRequired = (input) => {
    input.addClass("required");
    input.before(`<label for="${input.attr("id")}" style="color:red;"}">Please fill out this field correctly`);
};

function sendForm() {
    //remove all required here, add them back later
    $(".form-control").each(function () {
        let input = $(this); //object this iteration
        input.removeClass("required");
        $(`label[for=${input.attr("id")}]`).remove();
    });

    let missing = [];

    try {
        //https://stackoverflow.com/questions/4291005/jquery-get-all-input-from-specific-form
        //fname, sname, email
        $(".form-control:not(#message):not(#subject)").each(function () {
            let input = $(this); //object this iteration
            let id = input.attr("id");
            let pattern = regex[id]; //regex pattern for this tag
            let value = replaceSpecialChars(input.val());

            //input not sanitised
            //!pattern here to fix on/off bug
            if (!pattern.test(value)) {
                addRequired(input);
                //reset form value if incorrect
                input.val("");
                //add to error
                missing.push(` ${id}`);
            }
            //input sanitised
            //do nothing, this removes the issue about
            else if (pattern.test(value));
        });

        //check fname, sname, email for errors
        checkError(missing);

        //subject, message
        $("#message, #subject").each(function () {
            let input = $(this); //object this iteration
            let id = input.attr("id");
            let value = input.val();
            let sPattern = regex[id]; //regex sentence pattern for this tag
            let breakLoop = false; //if any one sentence is wrong regex

            //if there is an input
            if (value != "") {
                //split input into sentences
                let sentences = value.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);

                //validate each sentence
                sentences.forEach(s => {
                    //if input isn't broken yet
                    s = replaceSpecialChars(s);

                    if (!breakLoop) {
                        //validate input
                        if (sPattern.test(s)) {
                            //https://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string
                            s = s.replace(/(\r\n|\n|\r)/gm, "");
                        }
                        else if (!sPattern.test(s)) {
                            breakLoop = true;
                            missing.push(` ${id} (${s})`);
                        }
                    }
                });
            }

            if (breakLoop) addRequired(input);
        });

        checkError(missing);

        //everything's valid!
        //PHP HERE
        console.log("Valid form");

        //thank you message
        let name = replaceSpecialChars($("#fname").val());
        $(".thanks").text(`Thank you ${name}!`).slideDown().delay(2000).slideUp();

        //reset after being sent
        $(".form")[0].reset();
    }
    catch (error) {
        console.log(error);
    }
}

//https://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method
$(function () {
    //reset form text
    $(".form")[0].reset();
    $(".thanks").hide();

    //test values
    // $(".form #fname").val("Steven");
    // $(".form #sname").val("Lui");
    // $(".form #email").val("admin@admin.com");
    // $(".form #subject").val("Dragée gummi bears jelly ice cream sesame snaps lemon drops.");
    // $(".form #message").val("Jelly-o!?! apple pie cookie dessert (oat----cake caramels biscuit) pastry chocolate.. <Topping cookie cupcake> bonbon chocolate cake tart!!!!! Tart cake tiramisu soufflé marzipan. Candy halvah cotton candy tiramisu chocolate cake powder soufflé chocolate bar donut. Icing sugar plum cake tiramisu brownie... Gummies pudding liquorice sweet roll carrot cake? Jelly shortbread chocolate bar biscuit tiramisu");
});