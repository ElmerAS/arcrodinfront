<template>
  <div v-if="currentProforma" class="edit-form">
    <h4>Usuario</h4>
    <form>
      <div class="form-group">
        <label for="code">Codigo Proforma</label>
        <input
          type="text"
          class="form-control"
          id="code"
          v-model="proforma.codigoProforma"
          name="code"
        />
      </div>
      <div class="form-group">
        <label for="client">Cliente</label>
        <select 
          class="form-control"
          id="client"
          v-model="proforma.clienteId"
          name="client"
        >
          <option v-for="(client, index) in clients" :key="index" v-bind:value="client._id">{{ client.razonSocial }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="coin">Moneda</label>
        <select 
          class="form-control"
          name="coin" 
          id="coin"
          v-model="proforma.moneda"
        >
          <option value='nuevo sol'>nuevo sol</option>
        </select>
      </div>
      <div class="form-group">
        <label for="payMethod">Forma de Pago</label>
        <select 
          class="form-control"
          id="payMethod"
          v-model="proforma.formaPago"
          name="payMethod"
        >
          <option value='cash'>cash</option>
        </select>
      </div>
      <div class="form-group">
        <label for="type">Tipo</label>
        <select 
          class="form-control"
          name="type" 
          id="type"
          v-model="proforma.tipo"
        >
          <option value='proforma'>Proforma</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">Fecha de Emision</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="proforma.fechaEmision"
          name="date"
        />
      </div>
      <div class="form-group">
        <label for="state">Estado</label>
        <select 
          class="form-control"
          name="state" 
          id="state"
          v-model="proforma.estado"
        >
          <option value='valido'>Valido</option>
          <option value='descartado'>Descartado</option>
        </select>
      </div>
      <div class="form-group">
        <label for="obs">Observacion</label>
        <textarea
          class="form-control"
          id="type"
          rows="4"
          v-model="proforma.observacion"
          name="obs"
        />
      </div>
    </form>
    <button class="badge badge-info mr-2"
      @click="returnList()"
    >
      Regresar
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteProforma"
    >
      Eliminar
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateProforma"
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
import ProformaService from "../../services/ProformaDataService";
import ClientService from "../../services/ClientDataService";
export default {
  name: "proforma-edit",
  data() {
    return {
      currentProforma: null,
      message: ''
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/proformas'), 500);
    },
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
    getProforma(id) {
      ProformaService.get(id)
        .then(response => {
          this.currentProforma = response.data.proforma;
          console.log(response.data.proforma);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateProforma() {
      ProformaService.update(this.currentProforma._id, this.currentProforma)
        .then(response => {
          console.log(response.data);
          this.message = 'Proforma Actualizado Correctamente!';
          setTimeout(() => this.$router.push('/proformas'), 2000);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteProforma() {
      ProformaService.delete(this.currentProforma._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "proformas" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.retrieveClients();
    this.getProforma(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>