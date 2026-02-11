// Login Form 
console.log("login-form"); 
// show and hide password toggle
const password = document.querySelector("#password");
const passwordToggler = document.querySelector("#btn");

passwordToggler.addEventListener("click",(e)=>{
e.preventDefault();
    if(password.type ==="password"){
        password.type = "text";
        passwordToggler.innerText = "Hide";
    }else{
        password.type = "password";
        passwordToggler.innerText = "Show"
    }
})

