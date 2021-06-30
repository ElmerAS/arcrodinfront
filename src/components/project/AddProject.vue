<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="code">Codigo</label>
        <input
          type="text"
          class="form-control"
          id="code"
          required
          v-model="project.cod"
          name="code"
        />
      </div>
      <div class="form-group">
        <label for="title">Nombre de Proyecto</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="project.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="obs">Tecnologia Usada</label>
        <input
          class="form-control"
          id="obs"
          v-model="project.tech"
          name="obs"
        />
      </div>
      <div class="form-group">
        <!--<label for="client">Cliente</label>
        <input
          class="form-control"
          id="client"
          v-model="project.client"
          name="client"
        />-->
        <div class="form-group">
          <label for="add-users">Cliente:</label>
          <div class="dropdown">
            <div class="input-group">
              <input type="text" class="form-control dropdown-input" id="add-users" placeholder="Busqueda por nombre"
                v-model="keyword" v-if="Object.keys(selectedItem).length === 0" ref="dropdowninput"/>
              <div v-else @click="resetSelection" class="dropdown-selected">
                {{ selectedItem.name }}
              </div>
              <!--
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                  @click.prevent="checkName" v-if="Object.keys(selectedItem).length === 0"
                >
                  Buscar
                </button>
                <button class="upload-button btn btn-info" v-else>Añadir</button>
              </div>
              -->
            </div>
            <div v-show="keyword && userSearchList.length>0" class="dropdown-list">
              <div @click="selectItem(userOne)" v-show="itemVisible(userOne)" v-for="userOne in userSearchList" :key="userOne.id" class="dropdown-item">
                {{ userOne.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="returnList" class="btn btn-danger" style="margin:5px">Regresar</button>
      <button @click="saveProject" class="btn btn-success" style="margin:5px">Crear Proyecto</button>
    </div>

    <div v-else>
      <h4>Proyecto creado correctamente!</h4>
      <!--<button class="btn btn-success" @click="newUser">Añadir Nuevo</button>-->
    </div>
  </div>
</template>

<script>
import ProjectService from "../../services/ProjectDataService";
import ClientService from "../../services/ClientDataService";
import { debounce } from "lodash";
export default {
  name: "add-project",
  data() {
    return {
      project: {
        id: null,
        title: "",
        tech: "",
        cod: "",
        client: "",
        status: 0
      },
      submitted: false,
      userSearchList: [],
      selectedItem:{},
      keyword:""
    };
  },
  methods: {
    returnList(){
        setTimeout(() => this.$router.push('/projects'), 500);
    },
    resetSelection () {
      this.selectedItem = {}
      this.$nextTick( () => this.$refs.dropdowninput.focus() )
      this.$emit('on-item-reset')
    },
    selectItem (theItem) {
      console.log(theItem)
      this.selectedItem = theItem 
      this.keyword = ''
      this.$emit('on-item-selected', theItem)
    },
    itemVisible (item) {
      let currentName = item.name.toLowerCase()
      let currentInput = this.keyword.toLowerCase()
      return currentName.includes(currentInput)
    },
    checkName() {
      if(this.keyword){
        console.log(`Checking name: ${this.keyword}`);
        ClientService.findByName(this.keyword)
        .then(res => {
          console.log(res.data);
          this.userSearchList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      }else{
        this.userSearchList=[];
      }
    },
    saveProject() {
      var data = {
        title: this.project.title,
        tech: this.project.tech,
        cod: this.project.cod,
        client: this.project.client,
        clientId: this.selectedItem.id
      };

      ProjectService.create(data)
        .then(response => {
          this.project.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          setTimeout(() => this.$router.push('projects'), 2000);
        })
        .catch(e => {
          console.log(e);
          console.log(data)
        });
    },
    
    newProject() {
      this.submitted = false;
      this.project = {};
    }
  },
  mounted(){
    //this.getProject(this.$route.params.id);
    //this.getFilesList(this.$route.params.id);
    //this.getUserList(this.$route.params.id);
  },
  created() {
    this.debounceName = debounce(this.checkName, 1000);
  },
  watch: {
    keyword() {
      if (!this.keyword) return;
      this.debounceName();
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