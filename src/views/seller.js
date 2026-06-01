export function seller (){
    return `<h1 class ="text-2xl">this is the seller's dashboard</h1>`
}
export function sellerEvents () {
    document.querySelector("h1").addEventListener("click"), ()=> {alert("hola")}
}