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
      path: "/activate/:id",
      name: "user-activate",
      component: () => import("./components/user/ActivateUser"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("./components/project/ListProjects"),
    },
    {
      path: "/project/:id",
      name: "project-detail",
      component: () => import("./components/project/Project"),
    },
    {
      path: "/editProject/:id",
      name: "project-edit",
      component: () => import("./components/project/EditProject"),
    },
    {
      path: "/addProject",
      name: "add-project",
      component: () => import("./components/project/AddProject"),
    },
    {
      path: "/addUserStory/:idProject",
      name: "user-story-detail",
      component: () => import("./components/user-story/AddUserStory"),
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
