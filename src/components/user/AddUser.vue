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
          v-model="user.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="mail">Correo</label>
        <input
          type="text"
          class="form-control"
          id="mail"
          required
          v-model="user.mail"
          name="mail"
        />
      </div>
      <div class="form-group">
        <label for="description">Datos Adicionales</label>
        <input
          class="form-control"
          id="obs"
          required
          v-model="user.obs"
          name="obs"
        />
      </div>

      <div class="form-group">
        <label for="role">Rol</label>
        <select 
          class="form-control"
          name="role" 
          id="role"
          required
          v-model="user.role"
        >
          <option value=1>Desarrollador</option>
          <option value=2>Gestor</option>
          <option value=3>Administrador</option>
        </select>
      </div>
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveUser" class="btn btn-success" style="margin:5px">Crear Usuario</button>
    </div>

    <div v-else>
      <h4>Usuario creado correctamente!</h4>
      <!--<button class="btn btn-success" @click="newUser">Añadir Nuevo</button>-->
    </div>
  </div>
</template>

<script>
import UserService from "../../services/UserDataService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        name: "",
        obs: "",
        mail:"",
        role: 1,
        published: false
      },
      submitted: false
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/users'), 500);
    },
    saveUser() {
      var data = {
        name: this.user.name,
        obs: this.user.obs,
        role: this.user.role,
        mail:this.user.mail
      };

      UserService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          setTimeout(() => this.$router.push('users'), 2000);
        })
        .catch(e => {
          console.log(e);
          console.log(data)
        });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
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