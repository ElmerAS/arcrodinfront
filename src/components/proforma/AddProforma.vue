<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="code">Codigo Proforma</label>
        <input
          type="text"
          class="form-control"
          id="code"
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveProforma" class="btn btn-success" style="margin:5px">Crear Proforma</button>
    </div>

    <div v-else>
      <h4>Proforma creado correctamente!</h4>
    </div>
  </div>
</template>

<script>
import ProformaService from "../../services/ProformaDataService";
import ClientService from "../../services/ClientDataService";
export default {
  name: "add-proforma",
  data() {
    return {
      proforma: {
        id: null,
        codigoProforma: "",
        clienteId:"",
        moneda:"nuevo sol",
        formaPago: 'cash',
        tipo: 'proforma',
        fechaEmision: null,
        estado:'valido',
        observacion:'',
        obsInterna:'',
        published: false
      },
      clients: [],
      submitted: false
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
          if(response.data.cliente[0]){
            this.proforma.clienteId = response.data.cliente[0]._id;
          }
          console.log(response.data.cliente)
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveProforma() {
      var data = {
        codigoProforma: this.proforma.codigoProforma,
        clienteId:this.proforma.clienteId,
        moneda:this.proforma.moneda,
        formaPago:this.proforma.formaPago,
        tipo:this.proforma.tipo,
        fechaEmision:this.proforma.fechaEmision,
        estado:this.proforma.estado,
        observacion:this.proforma.observacion,
        obsInterna:this.proforma.obsInterna
      };
      console.log(data)
      ProformaService.create(data)
        .then(response => {
          this.proforma.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          setTimeout(() => this.$router.push('proformas'), 2000);
        })
        .catch(e => {
          console.log(e);
          console.log(data)
        });
    },
    
    newProforma() {
      this.submitted = false;
      this.proforma = {};
    }
  },
  mounted() {
    this.retrieveClients();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>