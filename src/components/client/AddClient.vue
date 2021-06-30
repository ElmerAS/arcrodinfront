<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="client.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="title">Contacto</label>
        <input
          type="text"
          class="form-control"
          id="owner"
          required
          v-model="client.owner"
          name="owner"
        />
      </div>
      <div class="form-group">
        <label for="title">Direccion</label>
        <input
          type="text"
          class="form-control"
          id="address"
          required
          v-model="client.address"
          name="address"
        />
      </div>
      <div class="form-group">
        <label for="mail">Correo</label>
        <input
          type="text"
          class="form-control"
          id="mail"
          required
          v-model="client.mail"
          name="mail"
        />
      </div>
      <div class="form-group">
        <label for="title">Telefono</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          required
          v-model="client.phone"
          name="phone"
        />
      </div>
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveClient" class="btn btn-success" style="margin:5px">Crear</button>
    </div>

    <div v-else>
      <h4>Cliente creado correctamente!</h4>
      <!--<button class="btn btn-success" @click="newClient">Añadir Nuevo</button>-->
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
        name: "", 
        owner: "", 
        address: "", 
        phone: "", 
        mail: "", 
        active: true
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
        name: this.client.name,
        owner: this.client.owner,
        address: this.client.address,
        mail:this.client.mail,
        phone:this.client.phone
      };

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