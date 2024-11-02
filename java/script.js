//andre
//signIn page
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");


loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "#21264D";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
})

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "#21264D";

    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
})

const logInputField = document.getElementById('logPassword');
const logInputIcon = document.getElementById('log-pasword');

const regInputField = document.getElementById('registerPassword');
const regInputIcon = document.getElementById('reg-pass-icon');

function myLogPassword(){
    if(logInputField.type === "password"){
        logInputField.type = "text";

        logInputIcon.name = "eye-off-outline";
        logInputIcon.style.cursor = "pointer";
    }
    else{
        logInputField.type = "password";

        logInputIcon.name = "eye-outline";
        logInputIcon.style.cursor = "pointer";

    }
}

function myRegPassword(){
    if(regInputField.type === "password"){
        regInputField.type = "text";

        regInputIcon.name = "eye-off-outline";
        regInputIcon.style.cursor = "pointer";
    }
    else{
        regInputField.type = "password";

        regInputIcon.name = "eye-outline";
        regInputIcon.style.cursor = "pointer";

    }
}

function changeIcon(value){
    if(value.length > 0){
        logInputIcon.name = "eye-outline";
        regInputIcon.name = "eye-outline";
    }else{
        logInputIcon.name = "lock-closed-outline";
        regInputIcon.name = "lock-closed-outline";
    }
}



//signin intro splash//

let SignInIntro = document.querySelector('.signIn-intro');
let SignInLogo = document.querySelector('.intro-logo-header');
let SignInSpan = document.querySelectorAll('.intro-text');

window.addEventListener('DOMContentLoaded', ()=>{

  setTimeout(()=>{

    SignInSpan.forEach((span, idx)=>{
      setTimeout(()=>{
        span.classList.add('active');
      }, (idx + 1) * 400)
    });

    setTimeout(()=>{
      SignInSpan.forEach((span, idx)=>{

        setTimeout(()=>{
          span.classList.remove('active');
          span.classList.add('fade');
        }, (idx + 1) * 50)
      })
    }, 2000);

    setTimeout(()=>{
      SignInIntro.style.top = '-100vh';
    }, 2300);

    setTimeout(()=> {
      SignInIntro.style.display = 'none';
    }, 2800);

  }, 700);
})
