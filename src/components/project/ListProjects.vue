<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por nombre"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-2">
      <router-link to="/addProject" class="nav-link btn btn-outline-info">Añadir</router-link>
    </div>
    <div class="col-md-6">
      <h4>Lista de Proyectos</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(project, index) in projects"
          :key="index"
          @click="setActiveProject(project, index)"
        >
          {{ project.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllProjects">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentProject">
        <h4>Proyecto</h4>
        <div>
          <label><strong>Codigo:</strong></label> {{ currentProject.cod }}
        </div>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentProject.title }}
        </div>
        <div>
          <label><strong>Tecnologia:</strong></label> {{ currentProject.tech }}
        </div>
        <a class="badge badge-info" :href="'/project/' + currentProject.id">Ver</a>
        <a class="badge badge-warning" :href="'/editProject/' + currentProject.id">Editar</a>
      </div>
      <div v-else>
        <br />
        <p>Por favor elige un proyecto...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectService from "../../services/ProjectDataService";

export default {
  name: "project-list",
  data() {
    return {
      projects: [],
      currentProject: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveProjects() {
      ProjectService.getAll()
        .then(response => {
          this.projects = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProjects();
      this.currentProject = null;
      this.currentIndex = -1;
    },

    setActiveProject(project, index) {
      this.currentProject = project;
      this.currentIndex = index;
    },

    removeAllProjects() {
      ProjectService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      ProjectService.findByName(this.name)
        .then(response => {
          this.projects = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveProjects();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.badge{
  margin-right: 10px;
}
</style>