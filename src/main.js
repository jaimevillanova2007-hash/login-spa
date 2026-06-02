import './style.css'
import { router } from './routes';

// esperemos a que el html cargue primero y despues se hace el router
document.addEventListener("DOMContentLoaded", () => {
  router(); 
});
// permite ir atras o adelante 
window.addEventListener("popstate", router);

