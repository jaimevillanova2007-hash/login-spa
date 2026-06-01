import { client } from "./client";
import { router } from "/src/routes.js";

export function formLogin() {
    return `  <div class="w-screen h-screen flex justify-center items-center border">
    <form id="form-login" class="flex flex-col gap-2 p-3.5 border rounded bg-gray-100">
    <label class="text-xl" >Email</label>
    <input id="email" class="text-xl border rounded p-1" type="email" placeholder="Enter your email" required>
    <label class="text-xl" >Password</label>
    <input id="password" class="text-xl border rounded p-1" type="password" placeholder="Enter your password" required>
    <button id="btn-login" class="w-full border rounded-lg p-1 uppercase bg-violet-900
    text-amber-50 mt-5 hover:bg-violet-950 hover:text-gray-300 hover:scale-105 transition">login</button>
    </form>
    </div>`
}


export async function events() {

    const users = await getUser();
    
    
    
    const formLogin = document.getElementById("form-login");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault()
        const email =  inputEmail.value
        const password = inputPassword.value
    

        const foundUser = users.find((user) => {
            return user.email === email &&  user.password === password
        })

        if (foundUser){
            localStorage.setItem("user",JSON.stringify({name:foundUser.name, role:foundUser.role}))
            if(foundUser.role === "client") {
                history.pushState({},"","/client")
                router()
                

            }else if (foundUser.role === "seller"){
                history.pushState({},"","/seller")
                router()
            }else if (foundUser.role === "admin"){
                history.pushState({}, "", "/admin" )
                router()
            }
        } 
        else {
            alert("invalid")
        }
        
    });


}
async function getUser() {
    const response = await fetch("http://localhost:3000/user")
    return response.json()
}





