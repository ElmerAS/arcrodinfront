<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="user.nombre"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Apellidos</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          required
          v-model="user.apellidos"
          name="lastname"
        />
      </div>
      <div class="form-group">
        <label for="mail">Correo</label>
        <input
          type="text"
          class="form-control"
          id="mail"
          required
          v-model="user.correo"
          name="mail"
        />
      </div>
      <div class="form-group">
        <label for="phone">Telefono</label>
        <input
          class="form-control"
          id="phone"
          required
          v-model="user.telefono"
          name="phone"
        />
      </div>

      <div class="form-group">
        <label for="role">Cargo</label>
        <select 
          class="form-control"
          name="role" 
          id="role"
          required
          v-model="user.cargo"
        >
          <option value='jefe'>Jefe</option>
          <option value='operador'>Operador</option>
        </select>
      </div>
      <div class="form-group">
        <label for="user">Usuario</label>
        <input
          class="form-control"
          id="user"
          required
          v-model="user.user"
          name="user"
        />
      </div>
      <div class="form-group">
        <label for="pass">Contraseña</label>
        <input
          class="form-control"
          id="pass"
          v-model="user.pass"
          name="pass"
        />
      </div>
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveUser" class="btn btn-success" style="margin:5px">Crear Usuario</button>
    </div>

    <div v-else>
      <h4>Usuario creado correctamente!</h4>
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
        nombre: "",
        apellidos: "",
        correo:"",
        telefono:"",
        cargo: 'operador',
        user: '',
        pass: '',
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
          nombre: this.user.nombre,
          apellidos: this.user.apellidos,
          correo:this.user.correo,
          telefono:this.user.telefono,
          cargo: this.user.cargo,
          user: this.user.user,
          pass: this.user.pass,
      };
    console.log(data)
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