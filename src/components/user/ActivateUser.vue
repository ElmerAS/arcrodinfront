<template>
  <div v-if="user" class="edit-form">
    <div v-if="!cpass">
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>
      <div class="form-group">
        <label for="re-password">Repetir Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="re-password"
          required
          v-model="password2"
          name="re-password"
        />
      </div>
      <button @click="activateUser" class="btn btn-success" style="margin:5px">Continuar</button>
      <p>{{ message }}</p>
    </div>

    <div v-else>
      <h4>Link de Activacion usado</h4>
      <h4>Puedes cerrar esta pagina</h4>
    </div>
  </div> 
  <div v-else>
    <br />
    <p>Elige un usuario...</p>
  </div> 
</template>

<script>
import UserService from "../../services/UserDataService";
export default {
  name: "activate-user",
  data() {
    return {
      user: null,
      password2: "",
      message: '',
      cpass:null
    };
  },
  methods: {
    getUser(id) {
      UserService.get(id)
        .then(response => {
          this.user = response.data;
          this.cpass = response.data.password;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    activateUser() {
        console.log("data enviada")
    console.log(this.password2 +" = "+ this.user.password);
      if(this.password2 == this.user.password){
        var data = {
            id: this.user.id,
            password: this.user.password,
            active: true
        };

        UserService.update(this.user.id, data)
            .then(response => {
            this.user.active = true;
            this.cpass = this.user.password;
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
      }else{
          this.message="Los campos de contraseña no coinciden. Revisar nuevamente"
      }
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>