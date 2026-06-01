import { events, formLogin } from "./views/login";
import { clientEvents, client } from "./views/client";
import { seller , sellerEvents} from "./views/seller";
import { admin , adminEvents } from "./views/admin";


const routes = {
    "/": {path:formLogin,events:events},
    "/client":{path:client, events:clientEvents},
    "/seller":{path:seller, events:sellerEvents},
    "/admin" :{path:admin, events:adminEvents}
}

export function router (){
    const path = window.location.pathname;
    const user = JSON.parse(localStorage.getItem("user"));
    if(user?.role !== "client" && path === "/client") {
         document.getElementById("app").innerHTML =` <h1>You dont have acces</h1>`;
    } else if (user?.role !== "seller" && path === "/seller") {
         document.getElementById("app").innerHTML =` <h1>You dont have acces</h1>`;
         
    }else if (user?.role !== "admin" && path === "/admin") {
        document.getElementById("app").innerHTML =` <h1>You dont have acces</h1>`;
    }
    else {
        
            const view = routes[path].path|| (() => `<h1> 404 </h1>`);
            document.getElementById("app").innerHTML = view();
            routes[path].events()

    }
    
};
