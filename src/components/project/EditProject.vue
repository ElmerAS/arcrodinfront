<template>
  <div v-if="currentProject" class="edit-form">
    <h4>Proyecto</h4>
    <form>
      <div class="form-group">
        <label for="code">Codigo</label>
        <input type="text" class="form-control" id="code"
          v-model="currentProject.cod"
        />
      </div>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" class="form-control" id="name"
          v-model="currentProject.title"
        />
      </div>
      <div class="form-group">
        <label for="obs">Tecnologia</label>
        <input type="text" class="form-control" id="obs"
          v-model="currentProject.tech"
        />
      </div>
      <div class="form-group">
        <label for="client">Cliente</label>
        <input type="text" class="form-control" id="client"
          v-model="currentProject.client"
        />
      </div>
    </form>
    <button class="badge badge-info mr-2"
      @click="returnList"
    >
      Regresar
    </button>
    <!--<button class="badge badge-primary mr-2"
      v-if="currentProject.active"
      @click="updateActive(false)"
    >
      Desactivar
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateActive(true)"
    >
      Activar
    </button>-->

    <button class="badge badge-danger mr-2"
      @click="deleteProject"
    >
      Eliminar
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateProject"
    >
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Elige un proyecto...</p>
  </div>
</template>

<script>
import ProjectService from "../../services/ProjectDataService";

export default {
  name: "project-edit",
  data() {
    return {
      currentProject: null,
      message: ''
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/projects'), 500);
    },
    getProject(id) {
      ProjectService.get(id)
        .then(response => {
          this.currentProject = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateActive(status) {
      var data = {
        id: this.currentProject.id,
        title: this.currentProject.title,
        cod: this.currentProject.cod,
        tech: this.currentProject.tech,
        client: this.currentProject.client
      };

      ProjectService.update(this.currentProject.id, data)
        .then(response => {
          this.currentProject.status = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateProject() {
      ProjectService.update(this.currentProject.id, this.currentProject)
        .then(response => {
          console.log(response.data);
          this.message = 'Proyecto Actualizado Correctamente!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteProject() {
      ProjectService.delete(this.currentProject.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "projects" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getProject(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>