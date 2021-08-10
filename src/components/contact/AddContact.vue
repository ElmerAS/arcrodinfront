<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="code">Codigo Contacto</label>
        <input
          type="text"
          class="form-control"
          id="code"
          required
          v-model="contact.codeContact"
          name="code"
        />
      </div>
      <div class="form-group">
        <label for="client">Cliente</label>
        <select 
          class="form-control"
          id="client"
          v-model="contact.clienteId"
          name="client"
          required
        >
          <option v-for="(client, index) in clients" :key="index" v-bind:value="client._id">{{ client.razonSocial }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="code">Nombres</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="contact.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="code">Apellidos</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          required
          v-model="contact.lastname"
          name="lastname"
        />
      </div>
      <div class="form-group">
        <label for="code">Correo</label>
        <input
          type="text"
          class="form-control"
          id="mail"
          required
          v-model="contact.mail"
          name="mail"
        />
      </div>
      <div class="form-group">
        <label for="code">Telefono</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          required
          v-model="contact.phone"
          name="phone"
        />
      </div>
      <div class="form-group">
        <label for="code">Cargo</label>
        <input
          type="text"
          class="form-control"
          id="role"
          required
          v-model="contact.role"
          name="role"
        />
      </div>
      <div class="form-group">
        <label for="code">Sucursal</label>
        <input
          type="text"
          class="form-control"
          id="place"
          required
          v-model="contact.place"
          name="place"
        />
      </div>
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveContact" class="btn btn-success" style="margin:5px">Crear Contacto</button>
    </div>

    <div v-else>
      <h4>Contacto creado correctamente!</h4>
    </div>
  </div>
</template>

<script>
import ContactService from "../../services/ContactDataService";
import ClientService from "../../services/ClientDataService";
export default {
  name: "add-contact",
  data() {
    return {
      contact: {
        id: null,
        codeContact: "",
        clienteId:"",
        name:"",
        lastname: '',
        mail: '',
        phone: '',
        role:'',
        place:'',
        published: false
      },
      clients: [],
      submitted: false
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/contacto'), 500);
    },
    retrieveClients() {
      ClientService.getAll()
        .then(response => {
          this.clients = response.data.cliente;
          if(response.data.cliente[0]){
            this.contact.clienteId = response.data.cliente[0]._id;
          }
          console.log(response.data.cliente)
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveContact() {
      var data = {
        codigoContacto: this.contact.codeContact,
        clienteId:this.contact.clienteId,
        nombres:this.contact.name,
        apellidos:this.contact.lastname,
        correo:this.contact.mail,
        telefono:this.contact.phone,
        cargo:this.contact.role,
        sucursal:this.contact.place
      };
      console.log(data)
      ContactService.create(data)
        .then(response => {
          this.contact.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          setTimeout(() => this.$router.push('contacto'), 2000);
        })
        .catch(e => {
          console.log(e);
          console.log(data)
        });
    },
    
    newContact() {
      this.submitted = false;
      this.contact = {};
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