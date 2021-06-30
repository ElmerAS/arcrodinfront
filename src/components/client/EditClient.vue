<template>
  <div v-if="currentClient" class="edit-form">
    <h4>Usuario</h4>
    <form>
      <div class="form-group">
        <label for="cod">Codigo</label>
        <input type="text" class="form-control" id="cod"
          v-model="currentClient.codigoCliente"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Razon Social</label>
        <input type="text" class="form-control" id="name"
          v-model="currentClient.razonSocial"
        />
      </div>
      <div class="form-group">
        <label for="address">Direccion</label>
        <input type="text" class="form-control" id="address"
          v-model="currentClient.direccion"
        />
      </div>
      <div class="form-group">
        <label for="ruc">RUC</label>
        <input type="text" class="form-control" id="ruc"
          v-model="currentClient.ruc"
        />
      </div>
      <div class="form-group">
        <label for="obs">Observaciones</label>
        <textarea class="form-control" id="obs" rows="4"
          v-model="currentClient.obsCliente"
        />
      </div>
    </form>
    <button class="badge badge-info mr-2"
      @click="returnList()"
    >
      Regresar
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteClient"
    >
      Eliminar
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateClient"
    >
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Elige un usuario...</p>
  </div>
</template>

<script>
import ClientService from "../../services/ClientDataService";

export default {
  name: "client-edit",
  data() {
    return {
      currentClient: null,
      message: ''
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/clients'), 500);
    },
    getClient(id) {
      ClientService.get(id)
        .then(response => {
          this.currentClient = response.data.cliente;
          console.log(response.data.cliente);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateClient() {
      ClientService.update(this.currentClient._id, this.currentClient)
        .then(response => {
          console.log(response.data);
          this.message = 'Cliente Actualizado Correctamente!';
          setTimeout(() => this.$router.push('/clients'), 2000);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteClient() {
      ClientService.delete(this.currentClient._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "clients" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getClient(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>