<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Codigo</label>
        <input
          type="text"
          class="form-control"
          id="cod"
          required
          v-model="userStory.cod"
          name="cod"
        />
      </div>
      <div class="form-group">
        <label for="mail">Descripcion</label>
        <input
          type="text"
          class="form-control"
          id="description"
          required
          v-model="userStory.description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="description">Pre Condition</label>
        <input
          class="form-control"
          id="preCondition"
          required
          v-model="userStory.preCondition"
          name="preCondition"
        />
      </div>
      <div class="form-group">
        <label for="description">Post Condition</label>
        <input
          class="form-control"
          id="postCondition"
          required
          v-model="userStory.postCondition"
          name="postCondition"
        />
      </div>
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveUserStory" class="btn btn-success" style="margin:5px">Crear Historia</button>
    </div>

    <div v-else>
      <h4>Usuario creado correctamente!</h4>
      <!--<button class="btn btn-success" @click="newUser">Añadir Nuevo</button>-->
    </div>
  </div>
</template>

<script>
import ProjectService from "../../services/ProjectDataService";

export default {
  name: "add-userStory",
  data() {
    return {
      userStory: {
        id: null,
        cod: "",
        idProject: "",
        description:"",
        preCondition: "",
        postCondition: "",
        status: 1
      },
      submitted: false
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push(`/project/${this.$route.params.idProject}`), 500);
    },
    saveUserStory() {
      var data = {
        cod: this.userStory.cod,
        idProject: this.$route.params.idProject,
        description: this.userStory.description,
        preCondition:this.userStory.preCondition,
        postCondition:this.userStory.preCondition
      };

      ProjectService.createProjectHU(data)
        .then(response => {
          this.userStory.id = response.data.id;
          this.submitted = true;
          setTimeout(() => this.$router.push(`/project/${response.data.idProject}`), 2000);
        })
        .catch(e => {
          console.log(e);
          console.log(data)
        });
    },
    newUserStory() {
      this.submitted = false;
      this.userStory = {};
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