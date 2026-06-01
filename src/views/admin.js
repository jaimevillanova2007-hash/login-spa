export function admin(){
    return `<h1 class ="text-2xl">this is the admin's dashboard</h1>`
}
export function adminEvents(){
    document.querySelector("h1").addEventListener("click"), ()=> {alert("hola")}
}