import { createRouter, createWebHistory } from "vue-router";
import Apps from "./components/Apps.vue";
import Crear from "./components/crearapp.vue";
import Detalles from "./components/appdetail.vue";
import Header from "./components/Header.vue";



const routes = [
    { path: "/", component: Header },
    { path: "/crear", component: Crear },
    { path: "/detalles", component: Detalles },
    
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;