<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por nombre"
          v-model="name" readonly/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" disabled type="button"
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
          {{ user.nombre }}
        </li>
      </ul>

      <button disabled class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>Usuario</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentUser.nombre }}
        </div>
        <div>
          <label><strong>Apellidos:</strong></label> {{ currentUser.apellidos }}
        </div>
        <div>
          <label><strong>Correo:</strong></label> {{ currentUser.correo }}
        </div>
        <div>
          <label><strong>Cargo:</strong></label> {{ currentUser.cargo }}
        </div>
        <div>
          <label><strong>Telefono:</strong></label> {{ currentUser.telefono }}
        </div>
        <div>
          <label><strong>Usuario:</strong></label> {{ currentUser.user }}
        </div>

        <a class="badge badge-warning"
          :href="'/editUser/' + currentUser._id"
        >
          Editar
        </a>
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
          this.users = response.data.usuarios;
          console.log(response.data.usuarios)
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