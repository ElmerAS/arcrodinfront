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
      <router-link to="/addClient" class="nav-link btn btn-outline-info">Añadir</router-link>
    </div>
    <div class="col-md-6">
      <h4>Lista de Clientes</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in clients"
          :key="index"
          @click="setActiveClient(user, index)"
        >
          {{ user.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllClients">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentClient">
        <h4>Cliente</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentClient.name }}
        </div>
        <div>
          <label><strong>Representante:</strong></label> {{ currentClient.owner }}
        </div>
        <div>
          <label><strong>Telefono:</strong></label> {{ currentClient.phone }}
        </div>
        <div>
          <label><strong>Correo:</strong></label> {{ currentClient.mail }}
        </div>
        <div>
          <label><strong>Direccion:</strong></label> {{ currentClient.address }}
        </div>
        <div>
          <label><strong>Estado:</strong></label> {{ currentClient.active ? "Habilitado" : "Pendiente" }}
        </div>

        <a class="badge badge-warning"
          :href="'/editClient/' + currentClient.id"
        >
          Editar
        </a>
        <h4 style="margin-top:10px">Proyectos:</h4>
        <ul class="list-group">
          <li class="list-group-item"
            v-for="(projectOne, index) in projects"
            :key="index"
          >
            {{ projectOne.project.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        <br />
        <p>Por favor elige un cliente...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ClientService from "../../services/ClientDataService";
import ProjectService from "../../services/ProjectDataService";
export default {
  name: "client-list",
  data() {
    return {
      clients: [],
      currentClient: null,
      currentIndex: -1,
      name: "",
      projects:[]
    };
  },
  methods: {
    retrieveClients() {
      ClientService.getAll()
        .then(response => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveClients();
      this.currentClient = null;
      this.currentIndex = -1;
    },

    setActiveClient(user, index) {
      this.currentClient = user;
      this.currentIndex = index;
      this.getProjects();
    },

    removeAllClients() {
      ClientService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      ClientService.findByName(this.name)
        .then(response => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getProjects(){
      console.log("inicio proyectos")
      ProjectService.getProjectbyClient(this.currentClient.id)
      .then(response => {
          console.log("proyectos")
          this.projects = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveClients();
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