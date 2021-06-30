<template>
  <div v-if="currentUser" class="edit-form">
    <h4>Usuario</h4>
    <form>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" class="form-control" id="name"
          v-model="currentUser.name"
        />
      </div>
      <div class="form-group">
        <label for="obs">Observaciones</label>
        <input type="text" class="form-control" id="obs"
          v-model="currentUser.obs"
        />
      </div>
      <div class="form-group">
        <label for="role">Rol</label>
        <select class="form-control" name="role" id="role"
          v-model="currentUser.role">
          <option value=1>Desarrollador</option>
          <option value=2>Gestor</option>
          <option value=3>Administrador</option>
        </select>
      </div>

      <div class="form-group">
        <label><strong>Estado:</strong></label>
        {{ currentUser.active ? "Habilitado" : "Pendiente" }}
      </div>
    </form>
    <button class="badge badge-info mr-2"
      @click="returnList()"
    >
      Regresar
    </button>
    <button class="badge badge-primary mr-2"
      v-if="currentUser.active"
      @click="updateActive(false)"
    >
      Desactivar
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateActive(true)"
    >
      Activar
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
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateActive(status) {
      var data = {
        id: this.currentUser.id,
        name: this.currentUser.name,
        role: this.currentUser.role,
        obs: this.currentUser.obs,
        active: status
      };

      UserService.update(this.currentUser.id, data)
        .then(response => {
          this.currentUser.active = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserService.update(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'Usuario Actualizado Correctamente!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserService.delete(this.currentUser.id)
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