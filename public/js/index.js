let url = "http://localhost:2022/";
let tcCheck;
let business_nature_val;

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
  let user_terms = "true";


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

                        if(res.statuscode == 200) {
                            
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Details Sent Successfully, Please Check Your Email.';                            

                            generateAuthNotification('bg-green', auth_message);

                        }
                        else if(res.statusCode == 500) {
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Something Went Wrong, Please Try Again...';                            

                            generateAuthNotification('bg-red', auth_message);
                        }
                      
                        
                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
            console.log(err);
            
        });
  }

  else {
    console.log("Please check the daata");
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
                        if(res.statuscode == 200) {
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Account Created Successfully';                            

                            generateAuthNotification('bg-green', auth_message);

                        }
                        else if(res.statuscode == 400) {
                            buttonLoader(e, 'remove_load');

                            auth_message = res.ErrorMessage;                          

                            generateAuthNotification('bg-red', auth_message);

                        }
                        else {
                            buttonLoader(e, 'remove_load');
                            auth_message = "Something Went Wrong, Please Try Again";
                            generateAuthNotification('bg-red', auth_message);
                        }
                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
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
                        if(res.statuscode == 200) {
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Account Logged in Successfully';

                            generateAuthNotification('bg-green', auth_message);
                            // window.location.assign('file:///F:/my_projects/Business%20Cards/aristos-business-card/card/product-html/card-templates.html');
                            window.location.assign('https://www.google.co.in/');
                        }
                        else {
                            buttonLoader(e, 'remove_load');

                            auth_message = 'Something Went Wrong, Please Try Again...';

                            generateAuthNotification('bg-red', auth_message);

                        }
                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           buttonLoader(e, 'remove_load');

            auth_message = 'Something Went Wrong, Please Try Again...';

            generateAuthNotification('bg-red', auth_message);
           
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
                        if(res.statuscode == 200) {
                           
                            buttonLoader(e, 'remove_load');

                             auth_message = 'Verification Mail Sent Succesfully, Please Check your Mail...';

                            generateAuthNotification('bg-green', auth_message);
                        }
                        else {
                           
                            buttonLoader(e, 'remove_load');
                            auth_message = 'Something Went Wrong, Please Try Again...';

                            generateAuthNotification('bg-red', auth_message);
                        }

                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           buttonLoader(e, 'remove_load');
            auth_message = 'Something Went Wrong, Please Try Again...';

            generateAuthNotification('bg-red', auth_message);
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
                        if(res.statuscode == 200) {
                            buttonLoader(e, 'remove_load');
                            auth_message = 'Password Changed Succesfully...';

                            generateAuthNotification('bg-green', auth_message);
                            
                        }
                        else {
                            buttonLoader(e, 'remove_load');
                            auth_message = 'Something Went Wrong, Please Try Again...';

                            generateAuthNotification('bg-red', auth_message);
                        }
                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           buttonLoader(e, 'remove_load');
            auth_message = 'Something Went Wrong, Please Try Again...';

            generateAuthNotification('bg-red', auth_message);
          
        });
  }
  else {
    console.log("Please Enter Email/password");
  }
}

function generateAuthNotification(status, message) {

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
}

function termsConditionsCheck(e) {
    if($('#tc_check').is(':checked') == true) {
        tcCheck = true;
    }
    else {
        tcCheck = false;
    }
    
}

// $('.auth-container').on('DOMSubtreeModified', function() {

    
let email_valid, user_name_valid, business_name_valid, business_nature_valid, password_valid, confirm_password_valid;

$('.auth-fld-inp').on('keyup',  function() {

    targetInput = event.target.value;
    targetInputName = event.target.attributes[2].value;


    if(targetInputName == 'user_username' || targetInputName == 'user_business_name' || targetInputName == 'user_business_nature') {
        if(targetInput == '' || (targetInput.length < 3)) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 3 Characters Required</div>");        
            if(targetInputName == 'user_username') {
                user_name_valid = false;
            }
            else if(targetInputName == 'user_business_name') {
                business_name_valid = false;
            }
            else if(targetInputName == 'user_business_nature') {
                business_nature_valid = false;
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
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();    

        }

        
    }
    else if(targetInputName == 'user_email') {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(targetInput == '' || (targetInput.length < 3)) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 3 Characters Required</div>");     
            email_valid = false;   
        }
        else if(regex.test(targetInput) !== true) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            email_valid = false;   
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Please Enter Valid Email</div>");        
        }
        else {
            email_valid = true;   
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();    
        }
    }
    else if(targetInputName === 'password') {
         if(targetInput == '' || (targetInput.length < 7)) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 6 Characters Required</div>");        
            password_valid = false;
        }
        else {
            password_valid = true;
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
        }
    }
    else if(targetInputName === 'user_confirm_password') {
        // console.log(targetInput);

         if(targetInput == '' || (targetInput.length < 7) || (targetInput != $('#password')[0].value)) {
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
            $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Miniumum 6 Characters Required</div>");        
            if((targetInput != $('#password')[0].value)) {
                $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
                $(event.target).parents('.auth-fld').append("<div class='auth-ired'>Passwords doesnt Match</div>");                        
            }
            confirm_password_valid = false;
        }
        else {
            confirm_password_valid = true;
            $(event.target).parents('.auth-fld').children('.auth-ired').remove();       
        }
    }
        
    

    if(user_name_valid === true && business_name_valid === true && business_nature_valid === true && email_valid === true && tcCheck === true) {
            $('.auth-btn').removeClass('auth-disable');
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


  if(password_valid === true && email_valid === true) {
            $('.auth-btn').removeClass('auth-disable');
    }
    if(password_valid === false || email_valid === false) {
            $('.auth-btn').addClass('auth-disable');
    }


    // if(email_valid === false) {
    //         console.log("sign up valid check");
    //         $('.auth-btn').addClass('auth-disable');
    // }
   
});

// });
