// Login Form 
console.log("login-form"); 
// show and hide password toggle
const password = document.querySelector("#password");
const passwordToggler = document.querySelector("#btn");
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn")

passwordToggler?.addEventListener("click",(e)=>{
e.preventDefault();
    if(password.type ==="password"){
        password.type = "text";
        passwordToggler.innerText = "Hide";
    }else{
        password.type = "password";
        passwordToggler.innerText = "Show"
    }
})

//authentication 
const form = document.querySelector("#login-form");
const LOGIN_URL = "https://sohel-portfolio.onrender.com/login"

form?.addEventListener("submit",async(e)=>{
    e.preventDefault();

    const email = document.querySelector("#email").value ;
    const password = document.querySelector("#password").value;

    const response = await fetch(LOGIN_URL,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({email,password})
    });
    const data = await response.json();
    if(response.ok){
        alert("login sucessful");
        
        // save token
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
     

    }else{
        alert(data.message);
    }
})


document.addEventListener("DOMContentLoaded",async()=>{
    await loadContent();
    const token  = localStorage.getItem("token");
    if(token) {
        const isValid = await verifyToken(token);

        if(isValid){
         loginBtn.disabled = true;
         loginBtn.style.display = "none";
         logoutBtn.style.display = "block";
        enableAdminMode();
        }else{
localStorage.removeItem("token");
            loginBtn.style.display = "block";
            logoutBtn.style.display = "none";
        }
    }else{
      
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none"
    }

})

async function verifyToken(token) {
    try {
        const response = await fetch("https://sohel-portfolio.onrender.com/verify", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}
// load Content

const loadContent =async()=>{
    const response = await fetch("https://sohel-portfolio.onrender.com/getContent");
    const data = await response.json();

    data.forEach(item =>{
        const el =document.querySelector(`[data-id = "${item.key}"]`);
        if(el){
            el.innerHTML = item.value;
        }
    })
}



// adim features

const editMode = document.querySelector("#editMode");
const saveBtn = document.querySelector("#save")
const editable = document.querySelectorAll(".editable");
const UPDATE_URL = "https://sohel-portfolio.onrender.com/updateContent"

// editable function

function enableAdminMode(){
    
    
   editMode.style.display = "inline-block";
   saveBtn.style.display = "inline-block"
   editMode?.addEventListener("click",()=>{
    editable.forEach(content=>{

         content.contentEditable = true;
         if(content.dataset.id === "admin-name"){
   content.focus();
         }
    });
    saveBtn.addEventListener("click",savePageContent)
   
   })

}

// save function frontend

async function savePageContent(){
 const contentData = {

 };


editable.forEach(el =>{
    const key = el.dataset.id;
    const value = el.innerHTML;
    contentData[key] = value;
})

const token = localStorage.getItem("token");
const response = await fetch(UPDATE_URL,{

     method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    },
    body: JSON.stringify(contentData)
})

   if (response.ok) {
        alert("Saved successfully!");
    } else {
        alert("Error saving content");
    }

};

logoutBtn?.addEventListener("click",()=>{
    localStorage.removeItem("token");
    
    //reset
    editable.forEach(el => el.contentEditable = false);
    window.location.href = "login.html"
})