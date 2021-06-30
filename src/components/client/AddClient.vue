<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="code">Codigo Cliente</label>
        <input
          type="text"
          class="form-control"
          id="code"
          required
          v-model="client.codigoCliente"
          name="code"
        />
      </div>
      <div class="form-group">
        <label for="name">Razon Social</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="client.razonSocial"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="address">Direccion</label>
        <input
          type="text"
          class="form-control"
          id="address"
          required
          v-model="client.direccion"
          name="address"
        />
      </div>
      <div class="form-group">
        <label for="ruc">RUC</label>
        <input
          type="text"
          class="form-control"
          id="ruc"
          required
          v-model="client.ruc"
          name="ruc"
        />
      </div>
      <div class="form-group">
        <label for="obs">Observaciones</label>
        <textarea
          class="form-control"
          id="obs"
          rows="4"
          v-model="client.obsCliente"
          name="obs"
        />
      </div>
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveClient" class="btn btn-success" style="margin:5px">Crear Cliente</button>
    </div>

    <div v-else>
      <h4>Cliente creado correctamente!</h4>
    </div>
  </div>
</template>

<script>
import ClientService from "../../services/ClientDataService";

export default {
  name: "add-client",
  data() {
    return {
      client: {
        id: null,
        codigoCliente: "",
        direccion:"",
        obsCliente:"",
        razonSocial: '',
        ruc: '',
        published: false
      },
      submitted: false
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/clients'), 500);
    },
    saveClient() {
      var data = {
        codigoCliente: this.client.codigoCliente,
        direccion:this.client.direccion,
        obsCliente:this.client.obsCliente,
        razonSocial: this.client.razonSocial,
        ruc: this.client.ruc,
      };
      console.log(data)
      ClientService.create(data)
        .then(response => {
          this.client.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          setTimeout(() => this.$router.push('clients'), 2000);
        })
        .catch(e => {
          console.log(e);
          console.log(data)
        });
    },
    
    newClient() {
      this.submitted = false;
      this.client = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>