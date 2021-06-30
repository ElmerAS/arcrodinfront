<template>
  <div v-if="currentUser" class="edit-form">
    <h4>Usuario</h4>
    <form>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" class="form-control" id="name"
          v-model="currentUser.nombre"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Apellidos</label>
        <input type="text" class="form-control" id="lastname"
          v-model="currentUser.apellidos"
        />
      </div>
      <div class="form-group">
        <label for="mail">Correo</label>
        <input type="text" class="form-control" id="mail"
          v-model="currentUser.correo"
        />
      </div>
      <div class="form-group">
        <label for="phone">Telefono</label>
        <input type="text" class="form-control" id="phone"
          v-model="currentUser.telefono"
        />
      </div>
      <div class="form-group">
        <label for="role">Cargo</label>
        <select class="form-control" name="role" id="role"
          v-model="currentUser.cargo">
          <option value='jefe'>Jefe</option>
          <option value='operador'>Operador</option>
        </select>
      </div>
      <div class="form-group">
        <label for="user">Usuario</label>
        <input type="text" class="form-control" id="user"
          v-model="currentUser.user"
        />
      </div>
    </form>
    <button class="badge badge-info mr-2"
      @click="returnList()"
    >
      Regresar
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteUser"
    >
      Eliminar
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateUser"
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
import UserService from "../../services/UserDataService";

export default {
  name: "user-edit",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/users'), 500);
    },
    getUser(id) {
      UserService.get(id)
        .then(response => {
          this.currentUser = response.data.usuario;
          console.log(response.data.usuario);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserService.update(this.currentUser._id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'Usuario Actualizado Correctamente!';
          setTimeout(() => this.$router.push('/users'), 2000);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserService.delete(this.currentUser._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "users" });
        })
        .catch(e => {
          console.log(e);
        });
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