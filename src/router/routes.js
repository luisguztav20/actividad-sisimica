const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue"), meta: { title: 'Inicio' } },
      { path: "login", component: () => import("pages/LoginPage.vue"), meta: { title: 'Inicio de Sesión' } },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: { title: 'Error not Found' }
  },
];

export default routes;
