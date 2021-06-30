<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por nombre"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-2">
      <router-link to="/addUser" class="nav-link btn btn-outline-info">Añadir</router-link>
    </div>
    <div class="col-md-6">
      <h4>Lista de Usuarios</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          {{ user.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>Usuario</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentUser.name }}
        </div>
        <div>
          <label><strong>Observaciones:</strong></label> {{ currentUser.obs }}
        </div>
        <div>
          <label><strong>Estado:</strong></label> {{ currentUser.active ? "Habilitado" : "Pendiente" }}
        </div>

        <a class="badge badge-warning"
          :href="'/editUser/' + currentUser.id"
        >
          Editar
        </a>
        <h4 style="margin-top:10px">Proyectos:</h4>
        <ul class="list-group">
          <li class="list-group-item"
            v-for="(projectOne, index) in projects"
            :key="index"
          >
            {{ projectOne.project.title }} <br> <strong>Cliente:</strong> {{ projectOne.project.client }}
          </li>
        </ul>
      </div>
      <div v-else>
        <br />
        <p>Por favor elige un usuario...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/UserDataService";
import ProjectService from "../../services/ProjectDataService";
export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      name: "",
      projects:[]
    };
  },
  methods: {
    retrieveUsers() {
      UserService.getAll()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
      this.getProjects();
    },

    removeAllUsers() {
      UserService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      UserService.findByName(this.name)
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getProjects(){
      ProjectService.getProjectbyUser(this.currentUser.id)
      .then(response => {
          this.projects = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>