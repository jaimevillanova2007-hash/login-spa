// importamos todos los dashboards con sus funciones

import { events, formLogin } from "./views/login";
import { clientLogout,renderCards, client } from "./views/client";
import { sellerLogout,seller , renderSeller, addCard, editProduct} from "./views/seller";
import { admin , adminLogout, renderAdmin, addCardAdmin, editProductAdmin, showUsers } from "./views/admin";


// creamo un objeto con cada ruta
const routes = {
    "/": {path:formLogin,events:events},
    "/client":{path:client, events:renderCards, logout:clientLogout},
    "/seller":{path:seller, events:renderSeller, logout:sellerLogout, addCard:addCard, editProduct:editProduct},
    "/admin" :{path:admin, events:renderAdmin, logout:adminLogout, addCard:addCardAdmin, editProduct:editProductAdmin, showUsers}
}

// una funcion que renderiza dependiendo la ruta 

export function router (){
    // se accede al url actual
    const path = window.location.pathname;
    // se accede al user en local storage
    const user = JSON.parse(localStorage.getItem("user"));
    // protegemos las rutas 
    if(user?.role !== "client" && path === "/client") {
         document.getElementById("app").innerHTML =` <h1>You dont have acces</h1>`;
    } else if (user?.role !== "seller" && path === "/seller") {
         document.getElementById("app").innerHTML =` <h1>You dont have acces</h1>`;
         
    }else if (user?.role !== "admin" && path === "/admin") {
        document.getElementById("app").innerHTML =` <h1>You dont have acces</h1>`;
    }

    else {
            // accedemos accedemos a la url del objeto de rutas 
            const view = routes[path].path|| (() => `<h1> 404 </h1>`);
            // modificamos el html
            document.getElementById("app").innerHTML = view();
            // accedemos a los eventos
            routes[path].events?.();
            routes[path].logout?.();
            routes[path].addCard?.();
            routes[path].editProduct?.();
            routes[path].showUsers?.();

    }
    
};
