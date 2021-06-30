import Vue from "vue";
import Router from "vue-router";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(Router);
Vue.use(VueToast);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/users",
      name: "users",
      component: () => import("./components/user/ListUsers"),
    },
    {
      path: "/editUser/:id",
      name: "user-edit",
      component: () => import("./components/user/EditUser"),
    },
    {
      path: "/addUser",
      name: "add-user",
      component: () => import("./components/user/AddUser"),
    },
    {
      path: "/clients",
      name: "clients",
      component: () => import("./components/client/ListClients"),
    },
    {
      path: "/client/:id",
      name: "client-view",
      component: () => import("./components/client/EditClient"),
    },
    {
      path: "/addClient",
      name: "add-client",
      component: () => import("./components/client/AddClient"),
    },
  ],
});
