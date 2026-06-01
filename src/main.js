import './style.css'
import { router } from './routes';


document.addEventListener("DOMContentLoaded", () => {
  router(); //when its done then render
});

window.addEventListener("popstate", router);

