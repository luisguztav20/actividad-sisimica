const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ViewDataPage.vue"),
        meta: { title: "Mostrar Datos" },
      },
    ],
  },
  {
    path: "/data",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { title: "Monitoreo Volcánico", requiresAuth: true }, // Solo esta ruta requiere autenticación
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
        meta: { title: "Iniciar sesion" },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: { title: "Error not Found" },
  },
];

export default routes;
