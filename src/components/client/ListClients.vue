<template>
  <div class="list row">
    <div class="col-md-8">
      <!--<div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por nombre"
          v-model="name" readonly/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" disabled type="button"
            @click="searchName"
          >
            Buscar
          </button>
        </div>
      </div>-->
    </div>
    <div class="col-md-2">
      <router-link to="/addClient" class="nav-link btn btn-outline-info">Añadir</router-link>
    </div>
    <div class="col-md-6">
      <h4>Lista de Clientes</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(client, index) in clients"
          :key="index"
          @click="setActiveClient(client, index)"
        >
          {{ client.razonSocial }}
        </li>
      </ul>

      <button disabled class="m-3 btn btn-sm btn-danger" @click="removeAllClients">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentClient">
        <h4>Cliente</h4>
        <div>
          <label><strong>Codigo:</strong></label> {{ currentClient.codigoCliente }}
        </div>
        <div>
          <label><strong>Razon Social:</strong></label> {{ currentClient.razonSocial }}
        </div>
        <div>
          <label><strong>Direccion:</strong></label> {{ currentClient.direccion }}
        </div>
        <div>
          <label><strong>RUC:</strong></label> {{ currentClient.ruc }}
        </div>
        <div>
          <label><strong>Observacion:</strong></label> {{ currentClient.obsCliente }}
        </div>

        <a class="badge badge-warning"
          :href="'/client/' + currentClient._id"
        >
          Editar
        </a>
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
export default {
  name: "clients-list",
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
          this.clients = response.data.cliente;
          console.log(response.data.cliente)
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

    setActiveClient(client, index) {
      this.currentClient = client;
      this.currentIndex = index;
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