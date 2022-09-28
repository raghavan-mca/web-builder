let url = "http://localhost:2022/";


function registerUser(e) {
  console.log("sd");

  let user_name = document.getElementById("username").value; 
  let user_email = document.getElementById("email").value;

  if(user_name !== '' && user_email !== '') {
    $(e).children("span").addClass("dn");
    $(e).addClass("auth-btn-load");

    let user_obj = {
        username: user_name,
        email: user_email
    };
    console.log(user_obj);
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
                        console.log(res.statuscode);

                        if(res.statuscode == 200) {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = 'Details Sent Successfully, Please Check Your Email.';
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-green");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }
                        if(res.statuscode == 200) {
                            if(res.message === 'User Already exist') {

                                $(e).children("span").removeClass("dn");
                                $(e).removeClass("auth-btn-load");

                                auth_message = 'User Already Exists, Please Sign In...';
                                $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                                $("#auth_notify").addClass("bg-green");
                                $("#auth_notify").addClass("auth-notify-show");
                                setTimeout(() => {
                                    $("#auth_notify").removeClass("auth-notify-show");
                                }, 8000);
                            }

                        }
                        else if(res.statuscode == 400) {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = 'Please Enter Valid Details';
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-red");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }
                        else if(res.statuscode == 500) {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = res.ErrorMessage;
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-red");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
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
    // document.getElementById("#user_err").appendChild("<div class='auth-ired'>Please Enter Username</div>");
                                                            
    //   document.getElementById("#email_err").innerHTML = `
    //                                                         <div class="auth-ired">
    //                                                             Please Enter Email
    //                                                         </div>
    //                                                         `;
  }
}

function createPassword(e) {
   console.log("sd");

  let user_email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(password !== '' && email !== '') {
    $(e).children("span").addClass("dn");
    $(e).addClass("auth-btn-load");

    let user_obj = {
        password: password,
        email: user_email
    };
    console.log(user_obj);
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
                        console.log(res.statuscode);
                        if(res.statuscode == 200) {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = 'Account Created Successfully';
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-green");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }
                        else if(res.statuscode == 400) {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");
                            auth_message = res.ErrorMessage;

                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-red");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }
                        else {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");
                            auth_message = "Something Went Wrong, Please Try Again";
                            
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-red");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
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
   console.log("sing in");

  let user_email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(password !== '' && email !== '') {
    $(e).children("span").addClass("dn");
    $(e).addClass("auth-btn-load");
    $("#auth_notify").removeClass("bg-green");
    $("#auth_notify").removeClass("bg-red");
    $("#auth_notify").removeClass("auth-notify-show");


    let user_obj = {
        password: password,
        email: user_email
    };
    console.log(user_obj);
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
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = 'Account Logged in Successfully';
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-green");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }
                        else {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = 'Something Went Wrong, Please Try Again...';
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-red");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }
                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           $(e).children("span").removeClass("dn");
            $(e).removeClass("auth-btn-load");

            auth_message = 'Something Went Wrong, Please Try Again...';
            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
            $("#auth_notify").addClass("bg-red");
            $("#auth_notify").addClass("auth-notify-show");
            setTimeout(() => {
                $("#auth_notify").removeClass("auth-notify-show");
            }, 8000);
        });
  }
}

function loadForgotPassword(e) {
  let user_email = document.getElementById("email").value;

  if(email !== '') {
    $(e).children("span").addClass("dn");
    $(e).addClass("auth-btn-load");
    $("#auth_notify").removeClass("bg-green");
    $("#auth_notify").removeClass("bg-red");
    $("#auth_notify").removeClass("auth-notify-show");

    let user_obj = {
        email: user_email
    };
    console.log(user_obj);
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
                        console.log(res.statuscode);
                        if(res.statuscode == 200) {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = 'Verification Mail Sent Succesfully, Please Check your Mail...';
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-green");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }
                        else {
                            $(e).children("span").removeClass("dn");
                            $(e).removeClass("auth-btn-load");

                            auth_message = 'Something Went Wrong, Please Try Again...';
                            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
                            $("#auth_notify").addClass("bg-red");
                            $("#auth_notify").addClass("auth-notify-show");
                            setTimeout(() => {
                                $("#auth_notify").removeClass("auth-notify-show");
                            }, 8000);
                        }

                   })
                   .catch((err) => {
                        console.log(err);
                   });
        })
        .catch((err) => {
           console.log(err);
           $(e).children("span").removeClass("dn");
            $(e).removeClass("auth-btn-load");

            auth_message = 'Something Went Wrong, Please Try Again...';
            $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
            $("#auth_notify").addClass("bg-red");
            $("#auth_notify").addClass("auth-notify-show");
            setTimeout(() => {
                $("#auth_notify").removeClass("auth-notify-show");
            }, 8000);
        });
  }
}

function resetPassword(e) {
  let user_email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(email !== '' && password !== '') {
     $(e).children("span").addClass("dn");
    $(e).addClass("auth-btn-load");
    $("#auth_notify").removeClass("bg-green");
    $("#auth_notify").removeClass("bg-red");
    $("#auth_notify").removeClass("auth-notify-show");
    
    let user_obj = {
        email: user_email,
        password: password
    };
    console.log(user_obj);
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

    firebase.initializeApp(firebaseConfig);
    const user = firebase.auth().currentUser;

    user.updatePassword(password).then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
    console.log(user);
    console.log(firebaseConfig);


    // fetch(url + 'resetuserpassword', resetPasswordOpt)
    //     .then((res) => {
    //             res.json()
    //                .then((res) => {
    //                     console.log(res.statuscode);
    //                     if(res.statuscode == 200) {
    //                         $(e).children("span").removeClass("dn");
    //                         $(e).removeClass("auth-btn-load");

    //                         auth_message = 'Password Changed Succesfully...';
    //                         $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
    //                         $("#auth_notify").addClass("bg-green");
    //                         $("#auth_notify").addClass("auth-notify-show");
    //                         setTimeout(() => {
    //                             $("#auth_notify").removeClass("auth-notify-show");
    //                         }, 8000);
    //                     }
    //                     else {
    //                         $(e).children("span").removeClass("dn");
    //                         $(e).removeClass("auth-btn-load");

    //                         auth_message = 'Something Went Wrong, Please Try Again...';
    //                         $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
    //                         $("#auth_notify").addClass("bg-red");
    //                         $("#auth_notify").addClass("auth-notify-show");
    //                         setTimeout(() => {
    //                             $("#auth_notify").removeClass("auth-notify-show");
    //                         }, 8000);
    //                     }
    //                })
    //                .catch((err) => {
    //                     console.log(err);
    //                });
    //     })
    //     .catch((err) => {
    //        console.log(err);
    //        $(e).children("span").removeClass("dn");
    //         $(e).removeClass("auth-btn-load");

    //         auth_message = 'Something Went Wrong, Please Try Again...';
    //         $("#auth_notify").children(".auth-notify-lbl").text(auth_message);
    //         $("#auth_notify").addClass("bg-red");
    //         $("#auth_notify").addClass("auth-notify-show");
    //         setTimeout(() => {
    //             $("#auth_notify").removeClass("auth-notify-show");
    //         }, 8000);
    //     });
  }
  else {
    console.log("Please Enter Email/password");
  }
}