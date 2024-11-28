import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useAuthStore } from "src/stores/auth"; // Importar el store de autenticación

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Guardián de navegación para manejar rutas protegidas
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); // Instancia del store de autenticación

    // Cambiar el título de la página
    const defaultTitle = "Monitoreo de Volcanes";
    document.title = to.meta.title || defaultTitle;

    // Verificar si la ruta requiere autenticación
    if (to.meta.requiresAuth && !authStore.user) {
      // Si no hay un usuario autenticado, redirige al login
      next("/");
    } else {
      // Si no requiere autenticación o el usuario está autenticado, continúa
      next();
    }
  });

  return Router;
});
