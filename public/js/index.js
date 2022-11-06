// let url = "http://localhost:2022/";
// let furl = "http://localhost:7071/";
let furl = "https://w3.frienddey.co.in/";
let url = "https://testingwebbuilder.herokuapp.com";

let tcCheck;
let business_nature_val;
let user_terms = "false";

function buttonLoader(e, status) {
    if(status == 'remove_load') {
         $(e).children("span").removeClass("dn");
        $(e).removeClass("auth-btn-load");  
    }
    else {
        $(e).children("span").addClass("dn");
        $(e).addClass("auth-btn-load"); 
    }

}

function notifyReset() {
    $('#auth_notify').children().remove();
    $("#auth_notify").removeClass("bg-green");
    $("#auth_notify").removeClass("bg-red");
    $("#auth_notify").removeClass("auth-notify-show");
}

function registerUser(e) {

  let user_name = document.getElementById("username").value; 
  let user_email = document.getElementById("email").value;
  let user_business_name = document.getElementById("business_name").value;
  let user_business_nature = document.getElementById("business_nature").value;

  if(user_terms === "false") {
    user_terms = '0';
  }
  else {
    user_terms = '1';
  }

  if(user_name !== '' && user_email !== '') {
    buttonLoader(e, '');
    notifyReset();

    let user_obj = {
        username: user_name,
        email: user_email,
        business_name: user_business_name,
        business_nature: user_business_nature,
        terms: user_terms
    };
    let signupOpt = {
        method: 'POST',
        body: JSON.stringify(user_obj),
        headers: {
              'Accept': '*/*',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
            }
    }

    fetch(url + 'signup', signupOpt)
        .then((res) => {
                return res.json()
                   .then((res) => {
                        console.log(res);

                        if(res.statuscode == 200 && res.data.message === 'user_already_exist') {
                            
                            buttonLoader(e, 'remove_load');

                            auth_message = 'User Already Exists !!!';                         
                            auth_sub_message = '';
                            generateAuthNotification('bg-red', auth_message, auth_sub_message);

                        }

                        else if(res.statuscode == 200 && res.message === 'success') {
                            
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Details Sent Successfully';                            
                            auth_sub_message = 'Please Check Your Email.';
                            generateAuthNotification('bg-green', auth_message, auth_sub_message);

                        }
                        
                        else if(res.statuscode == 500 || res.statuscode == 400 || (res.statuscode == 204 && res.message === 'success')) {
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Something Went Wrong !!!';                            
                            auth_sub_message = 'Please Try Again...';
                            generateAuthNotification('bg-red', auth_message, auth_sub_message);
                        }
                      
                        
                   })
                   .catch((err) => {
                        console.log(err);
                         buttonLoader(e, 'remove_load');

                        auth_message = 'Something Went Wrong !!!';                            
                        auth_sub_message = 'Please Try Again...';

                        generateAuthNotification('bg-red', auth_message, auth_sub_message);
                   });
        })
        .catch((err) => {
            console.log(err);
            buttonLoader(e, 'remove_load');

            auth_message = 'Something Went Wrong !!!';                            
            auth_sub_message = 'Please Try Again...';

            generateAuthNotification('bg-red', auth_message, auth_sub_message);
        });
  }

  else {
     buttonLoader(e, 'remove_load');

    auth_message = 'Please Enter the Details !!!';                            
    auth_sub_message = '';

    generateAuthNotification('bg-red', auth_message, auth_sub_message);
  }
}

function createPassword(e) {

  let user_email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(password !== '' && email !== '') {
    buttonLoader(e, '');
    notifyReset();

    let user_obj = {
        password: password,
        email: user_email
    };
    let creatPassOpt = {
        method: 'POST',
        body: JSON.stringify(user_obj),
        headers: {
              'Accept': '*/*',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
            }
    }

    fetch(url + 'createpassword', creatPassOpt)
        .then((res) => {
                res.json()
                   .then((res) => {
                        console.log(res);
                        if(res.statuscode == 200) {
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Account Created Successfully';                            
                            auth_sub_message = 'Redirecting to Sign In...';
                            generateAuthNotification('bg-green', auth_message, auth_sub_message);
                            setTimeout(() => {
                                // window.location.href(`${url}signin-auth`);
                                $(location).attr('href', `${url}signin-auth`);
                            }, 3000)
                        }
                        else if(res.statuscode == 400) {
                            buttonLoader(e, 'remove_load');

                            auth_message = res.ErrorMessage;                          
                            auth_sub_message = '';
                            generateAuthNotification('bg-red', auth_message, auth_sub_message);

                        }
                        else {
                            buttonLoader(e, 'remove_load');
                            auth_message = "Something Went Wrong !!!";
                            auth_sub_message = 'Please Try Again';
                            generateAuthNotification('bg-red', auth_message, auth_sub_message);
                        }
                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           buttonLoader(e, 'remove_load');
            auth_message = "Something Went Wrong !!!";
            auth_sub_message = 'Please Try Again';
            generateAuthNotification('bg-red', auth_message, auth_sub_message);
        });
  }
}

function signIn(e) {

  let user_email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(password !== '' && email !== '') {
    buttonLoader(e, '');
    notifyReset();

    let user_obj = {
        password: password,
        email: user_email
    };
    let signInOpt = {
        method: 'POST',
        body: JSON.stringify(user_obj),
        headers: {
              'Accept': '*/*',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
            }
    }

    fetch(url + 'signin', signInOpt)
        .then((res) => {
                res.json()
                   .then((res) => {
                        console.log(res.statuscode);
                        if(res.statuscode == 500 && res.errormessage === 'FirebaseError: Firebase: Error (auth/user-not-found).') {
                             buttonLoader(e, 'remove_load');

                            auth_message = 'User Not Found !!!';
                            auth_sub_message = 'Please Enter Correct User or Sign Up...';
                            generateAuthNotification('bg-red', auth_message, auth_sub_message);
                        }
                        else if(res.statuscode == 500 && res.errormessage === 'FirebaseError: Firebase: Error (auth/wrong-password).') {
                             buttonLoader(e, 'remove_load');

                            auth_message = 'Wrong Password !!!';
                            auth_sub_message = 'Please Enter Correct Password...';

                            generateAuthNotification('bg-red', auth_message, auth_sub_message);
                        }
                        else if(res.statuscode == 500 && res.errormessage === 'FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
                             buttonLoader(e, 'remove_load');

                            auth_message = 'Too Many Failed Attempts !!!';
                            auth_sub_message = 'Please Try After Some Time...';

                            generateAuthNotification('bg-red', auth_message, auth_sub_message);
                        }
                        

                        else if(res.statuscode == 200 && res.message === 'success') {
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Account Logged in Successfully';
                            auth_sub_message = 'Logging In Now...';

                            generateAuthNotification('bg-green', auth_message, auth_sub_message);
                            setTimeout(() => {
                                window.location.attr('href', `${furl}aristos-business-card/card/product-html/card-templates.html#${btoa(JSON.stringify(res))}`);
                            }, 500)
                            // window.location.assign('file:///F:/my_projects/Business%20Cards/aristos-business-card/card/product-html/card-templates.html');
                        }
                        else{
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Something Went Wrong !!!';
                            auth_sub_message = 'Please Try Again...';

                            generateAuthNotification('bg-red', auth_message, auth_sub_message);

                        }
                        
                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           buttonLoader(e, 'remove_load');

            auth_message = 'Something Went Wrong !!!';
            auth_sub_message = 'Please Try Again...';

            generateAuthNotification('bg-red', auth_message, auth_sub_message);
           
        });
  }
}

function loadForgotPassword(e) {
  let user_email = document.getElementById("email").value;

  if(email !== '') {
    buttonLoader(e, '');
    notifyReset();

    let user_obj = {
        email: user_email
    };
    let forgotPasswordOpt = {
        method: 'POST',
        body: JSON.stringify(user_obj),
        headers: {
              'Accept': '*/*',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
            }
    }

    fetch(url + 'forgetpassword', forgotPasswordOpt)
        .then((res) => {
                res.json()
                   .then((res) => {
                    console.log(res);
                        if(res.statuscode == 400 && res.errormessage === 'invalid_data') {
                            buttonLoader(e, 'remove_load');
                            auth_message = 'Email Not Found !!!';
                            auth_sub_message = 'Please Enter Correct Email...';

                            generateAuthNotification('bg-red', auth_message, auth_sub_message);
                            
                        }
                        else {
                            
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Verification Mail Sent Succesfully !!!';
                            auth_sub_message = 'Please Check your Mail...';

                            generateAuthNotification('bg-green', auth_message, auth_sub_message);
                        }

                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           buttonLoader(e, 'remove_load');
            auth_message = 'Something Went Wrong !!!';
            auth_sub_message = 'Please Try Again...';

            generateAuthNotification('bg-red', auth_message, auth_sub_message);
        });
  }
}

function resetPassword(e) {
  let user_email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(email !== '' && password !== '') {
     buttonLoader(e, '');
     notifyReset();
    
    let user_obj = {
        email: user_email,
        password: password
    };
    let resetPasswordOpt = {
        method: 'POST',
        body: JSON.stringify(user_obj),
        headers: {
              'Accept': '*/*',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
            }
    }


    fetch(url + 'resetuserpassword', resetPasswordOpt)
        .then((res) => {
                res.json()
                   .then((res) => {
                        if(res.statuscode == 200 && res.message == 'success') {
                            buttonLoader(e, 'remove_load');
                            $('.auth-btn').addClass('auth-disable');
                            auth_message = 'Password Changed Succesfully...';
                            auth_sub_message = 'Redirecting to Sign In';

                            generateAuthNotification('bg-green', auth_message, auth_sub_message);
                            setTimeout(() => {
                                // window.location.assign('signin-auth');
                                $(location).attr('href', `${url}signin-auth`);
                            }, 3000);

                        }
                        else {
                            buttonLoader(e, 'remove_load');
                            auth_message = 'Something Went Wrong !!!';
                            auth_sub_message = 'Please Try Again...';

                            generateAuthNotification('bg-red', auth_message, auth_sub_message);
                        }
                   })
                   .catch((err) => {
                        console.log(err);
                        buttonLoader(e, 'remove_load');
                        auth_message = 'Something Went Wrong !!!';
                        auth_sub_message = 'Please Try Again...';

                        generateAuthNotification('bg-red', auth_message, auth_sub_message);
                   });
        })
        .catch((err) => {
           console.log(err);
           buttonLoader(e, 'remove_load');
            auth_message = 'Something Went Wrong !!!';
            auth_sub_message = 'Please Try Again...';

            generateAuthNotification('bg-red', auth_message, auth_sub_message);
          
        });
  }
  else {
    buttonLoader(e, 'remove_load');
    auth_message = 'Please Enter Password !!!';
    auth_sub_message = '';

    generateAuthNotification('bg-red', auth_message, auth_sub_message);
  }
}

function generateAuthNotification(status, message, sub_message) {

    if(status == 'bg-red') {
        $("#auth_notify").addClass("bg-red");
        $("#auth_notify").append("<div class='auth-close'></div>");
    }
    else if(status == 'bg-green') {
        $("#auth_notify").addClass("bg-green");
        $("#auth_notify").append("<div class='auth-tick'></div>");
    }

    $("#auth_notify").append("<div class='auth-notify-lbl'></div>");
    $("#auth_notify").children(".auth-notify-lbl").text(message);

    $("#auth_notify").append("<div class='auth-notify-sublbl'></div>");
    $("#auth_notify").children(".auth-notify-sublbl").text(sub_message);
    
    $("#auth_notify").addClass("auth-notify-show");
    setTimeout(() => {
        $("#auth_notify").removeClass("auth-notify-show");
        $("#auth_notify").removeClass("bg-green");
        $("#auth_notify").removeClass("bg-red");

    }, 8000);
}

function selectBoxOpen(e) {
    $(e).children('.auth-sel-opts').toggleClass('dn');
}

function selectBoxOptionSelected(e) {
    business_nature_val = $(e).children('.auth-sel-txt').text();
    $('#business_nature').attr('value', business_nature_val);
    $('#business_nature_val').text(business_nature_val);
    $('#business_nature').addClass('auth-bgreen');
    business_nature_valid = true;
    signUpValidate();
}

function termsConditionsCheck(e) {
    if($('#tc_check').is(':checked') == true) {
        tcCheck = true;
        user_terms = true;
        signUpValidate();
    }
    else {
        tcCheck = false;
        user_terms = false;

        signUpValidate();
    }
    
}

// $('.auth-container').on('DOMSubtreeModified', function() {

// });
    
let email_valid, user_name_valid, business_name_valid, business_nature_valid, password_valid, confirm_password_valid;


// $('.auth-fld-inp').on('keyup',  function() {});
$('.auth-fld-inp').on('keyup change',  validateFields);

function validateFields() {
    targetInput = event.target.value;
    targetInputName = event.target.attributes[2].value;
    validator(targetInput, targetInputName);
}

function validator(targetInput, targetInputName) {
    let currentInput = $(event.target).parents('.auth-fld').children('.auth-fld-inp');
    if(targetInputName == 'user_username' || targetInputName == 'user_business_name' || targetInputName == 'user_business_nature') {

        // if(targetInputName != 'user_business_name') {

       
        // }
        if(targetInputName == 'user_business_name') {
            if(targetInput == '' || (targetInput.length < 1)) {
                $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 1 Character Required</div>");
                currentInput.removeClass('auth-bgreen');
                currentInput.addClass('auth-bred');

                business_name_valid = false;
            }
            else {
                 $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                currentInput.addClass('auth-bgreen');
                currentInput.removeClass('auth-bred');
                business_name_valid = true;
            }
        }
        else if(targetInputName == 'user_username') {
            let userNameRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;

            if(targetInput == '' || (targetInput.length < 3)) {
                $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 3 Characters Required</div>");
                currentInput.removeClass('auth-bgreen');
                currentInput.addClass('auth-bred');

                user_name_valid = false;
                // else if(targetInputName == 'user_business_nature') {
                //     business_nature_valid = false;
                // }
            }
            else if(targetInput.includes(' ')) {
                $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                $(event.target).parents('.auth-fld').append("<div class='auth-ired'>UserName Can't Contain Spaces, Use Hyphens</div>");
                currentInput.removeClass('auth-bgreen');
                currentInput.addClass('auth-bred');
                user_name_valid = false;
            }

            else if(userNameRegex.test(targetInput) === false) {
                if(targetInput[0] === '-' || targetInput[targetInput.length - 1] === '-') {
                    $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                    $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Hyphens Can't be Included in Start or End</div>");
                    currentInput.removeClass('auth-bgreen');
                    currentInput.addClass('auth-bred');
                    user_name_valid = false;    
                }
                else {
                    $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                    $(event.target).parents('.auth-fld').append("<div class='auth-ired'>UserName Can't Contain Special Characters</div>");
                    currentInput.removeClass('auth-bgreen');
                    currentInput.addClass('auth-bred');
                    user_name_valid = false;    
                }
            }
            else {
               $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                // $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Spaces Can't be Entered. Use Hyphens</div>");
                currentInput.addClass('auth-bgreen');
                currentInput.removeClass('auth-bred');
                user_name_valid = true;
            }
        }
        else {
            if(targetInputName == 'user_username') {
                user_name_valid = true;
            }
            else if(targetInputName == 'user_business_name') {
                business_name_valid = true;
            }
            else if(targetInputName == 'user_business_nature') {
                business_nature_valid = true;
            }
            currentInput.removeClass('auth-bred');
            currentInput.addClass('auth-bgreen');
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();    

        }
        
    }
    else if(targetInputName == 'user_email') {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(targetInput == '' || (targetInput.length < 3)) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 3 Characters Required</div>");     
            currentInput.removeClass('auth-bgreen');
            currentInput.addClass('auth-bred');
            email_valid = false;   
        }
        else if(targetInput.includes(' ')) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Spaces Can't be Included</div>");     
            currentInput.removeClass('auth-bgreen');
            currentInput.addClass('auth-bred');
            email_valid = false;   
        }
        else if(regex.test(targetInput) !== true) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            email_valid = false;   
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Please Enter Valid Email</div>");        
            currentInput.removeClass('auth-bgreen');
            currentInput.addClass('auth-bred');
        }
        else {
            email_valid = true;  
            currentInput.removeClass('auth-bred');
            currentInput.addClass('auth-bgreen'); 
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();    
        }
    }
    else if(targetInputName === 'password') {
         if(targetInput == '' || (targetInput.length < 6)) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 6 Characters Required</div>");    
            currentInput.removeClass('auth-bgreen');
            currentInput.addClass('auth-bred');    
            password_valid = false;
        }
        else {
            password_valid = true;
            currentInput.removeClass('auth-bred');
            currentInput.addClass('auth-bgreen'); 
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
        }
    }
    else if(targetInputName === 'user_confirm_password') {
        // console.log(targetInput);

         if(targetInput == '' || (targetInput.length < 6) || (targetInput != $('#password')[0].value)) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 6 Characters Required</div>");   
            currentInput.removeClass('auth-bgreen');
            currentInput.addClass('auth-bred');      
            if((targetInput != $('#password')[0].value)) {
                $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Passwords doesnt Match</div>");                        
            }
            confirm_password_valid = false;
        }
        else {
            confirm_password_valid = true;
            currentInput.removeClass('auth-bred');
            currentInput.addClass('auth-bgreen'); 
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
        }
    }

    signUpValidate();

    if(password_valid === true && email_valid === true) {
            $('.auth-btn').removeClass('auth-disable');
    }
    if(password_valid === false || email_valid === false) {
            $('.auth-btn').addClass('auth-disable');
    }
}

function signUpValidate() {
     if(user_name_valid === true && business_name_valid === true && business_nature_valid === true && email_valid === true && tcCheck === true) {
            $('.auth-btn').removeClass('auth-disable');
    }
    if(user_name_valid === true && business_name_valid === true && business_nature_valid === true && email_valid === true && tcCheck === false) {
            $('.auth-btn').addClass('auth-disable');
    }

    if(user_name_valid === false && business_name_valid === true && business_nature_valid === true && email_valid === true) {
            $('.auth-btn').addClass('auth-disable');
    }
    if(user_name_valid === true && business_name_valid === false && business_nature_valid === true && email_valid === true) {
            $('.auth-btn').addClass('auth-disable');
    }
    if(user_name_valid === true && business_name_valid === true && business_nature_valid === false && email_valid === true) {
            $('.auth-btn').addClass('auth-disable');
    }
    if(user_name_valid === true && business_name_valid === true && business_nature_valid === true && email_valid === false) {
            $('.auth-btn').addClass('auth-disable');
    }
}

function fldClear(e) {
    
    $(e).parents('.auth-fld').children('.auth-fld-inp').val('');
    let target_inpuel = $(e).parents('.auth-fld').children('.auth-fld-inp').attr('name');
    if(target_inpuel === 'user_username') {
        user_name_valid = false;
        signUpValidate();
        console.log(target_inpuel);
        // validateFields($(e).parents('.auth-fld').children('.auth-fld-inp').trigger('keyup'));
        validator($(e).parents('.auth-fld').children('.auth-fld-inp').val(), target_inpuel);
    }
    else if(target_inpuel === 'user_email') {
        email_valid = false;
        signUpValidate();
        validator($(e).parents('.auth-fld').children('.auth-fld-inp').val(), target_inpuel);

    }
     else if(target_inpuel === 'user_business_name') {
        business_name_valid = false;
        signUpValidate();
        validator($(e).parents('.auth-fld').children('.auth-fld-inp').val(), target_inpuel);

    }

}

function togglePasswordFld(e) {
    let pass_fld = $(e).parents('.auth-fld').children('.auth-fld-inp');
    if(pass_fld.attr('type') === 'text') {
        pass_fld.attr('type', 'password');
        $(e).removeClass('auth-fld-eyes');
        $(e).addClass('auth-fld-eye');
    }
    else {
        pass_fld.attr('type', 'text');
        $(e).addClass('auth-fld-eyes');
        $(e).removeClass('auth-fld-eye');
    }
}
