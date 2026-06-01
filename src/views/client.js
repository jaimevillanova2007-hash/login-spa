export function client (){
    return`<h1 class ="text-2xl">this is the client's dashboard</h1>`
}

export function clientEvents () {

    document.querySelector("h1").addEventListener("click", () => {alert("hola")})
}