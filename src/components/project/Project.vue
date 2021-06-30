<template>
  <div v-if="currentProject" class="project-detail-view">
    <div class="row">
      <div class="col-md-12">
        <h4>Detalle del proyecto</h4>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="code">Codigo de proyecto:</label>
            <input class="form-control" type="text" id="code" v-model="currentProject.cod" readonly>
          </div>
          <div class="form-group col-md-4">
            <label for="title">Titulo del proyecto:</label>
            <input class="form-control" type="text" id="title" v-model="currentProject.title" readonly>
          </div>
          <div class="form-group col-md-4">
            <label for="client">Cliente:</label>
            <input class="form-control" type="text" id="client" v-model="currentProject.client" readonly>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="code">Fecha de inicio:</label>
            <input class="form-control" type="text" id="startDate" v-model="currentProject.startDate" readonly>
          </div>
          <div class="form-group col-md-4">
            <label for="title">Fecha de fin:</label>
            <input class="form-control" type="text" id="finishDate" v-model="currentProject.finishDate" readonly>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h4>Usuarios</h4>
        <div class="form-group">
          <label for="add-users">Añadir Nuevo:</label>
          <div class="dropdown">
            <div class="input-group">
              <input type="text" class="form-control dropdown-input" id="add-users" placeholder="Busqueda por nombre"
                v-model="keyword" v-if="Object.keys(selectedItem).length === 0" ref="dropdowninput"/>
              <div v-else @click="resetSelection" class="dropdown-selected">
                {{ selectedItem.name }}
              </div>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                  @click.prevent="checkName" v-if="Object.keys(selectedItem).length === 0"
                >
                  Buscar
                </button>
                <button class="upload-button btn btn-info" v-else @click="addUser">Añadir</button>
              </div>
            </div>
            <div v-show="keyword && userSearchList.length>0" class="dropdown-list">
              <div @click="selectItem(userOne)" v-show="itemVisible(userOne)" v-for="userOne in userSearchList" :key="userOne.id" class="dropdown-item">
                {{ userOne.name }} - Rol: {{ userOne.obs }}
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <p>Asignados</p>
          <ul class="list-group">
            <li class="list-group-item"
              v-for="(projectUser, index) in projectUsers"
              :key="index"
              @click="setActiveUser(projectUser, index)"
            >
              {{ projectUser.user.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Documentos:</h4>
        <div class="form-group">
          <label>Añadir nuevo documento</label>
          <form @submit.prevent="onUploadFile" enctype="multipart/form-data">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="documentFile" @change="onFileChange" required>
              <label class="custom-file-label" for="documentFile" data-browse="Examinar">
                <span v-if="selectedFile">{{selectedFile.name}}</span><span v-else>Elige un Archivo...</span></label>
            </div>
            <button class="upload-button btn btn-info" :disabled="!this.selectedFile">Cargar</button>
          </form>
        </div>
        <div class="form-group">
          <p>Documentacion Actual</p>
          <ul class="list-group">
            <li class="list-group-item"
              v-for="(file, index) in files"
              :key="index"
              @click="setActiveDocument(file, index)"
            >
              {{ file.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h4>Historias de usuario:</h4>
        <div class="form-group">
          <button @click="newHU()" class="upload-button btn btn-success">Nueva Historias</button>
        </div>
        <div class="form-group">
          <p>Actualmente registrada</p>
          <ul class="list-group">
            <li class="list-group-item"
              v-for="(hu, index) in hus"
              :key="index"
              @click="setActiveDocument(hu, index)"
            >
              {{ hu.cod }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    No se encontro informacion del proyecto.
    <button class="btn btn-info" @click="returnList">Regresar</button>
  </div>
</template>
<script>
  import ProjectService from "../../services/ProjectDataService";
  import UserService from "../../services/UserDataService";
  import { debounce } from "lodash";
  export default {
    name:"project-detail",
    data(){
      return {
        currentProject:null,
        selectedFile: "",
        keyword:"",
        files:null,
        hus:null,
        projectUsers:null,
        userSearchList: [],
        selectedItem:{}
      };
    },
    methods:{
      returnList(){
        setTimeout(() => this.$router.push('/projects'), 500);
      },
      resetSelection () {
        this.selectedItem = {}
        this.$nextTick( () => this.$refs.dropdowninput.focus() )
        this.$emit('on-item-reset')
      },
      selectItem (theItem) {
        this.selectedItem = theItem 
        this.keyword = ''
        this.$emit('on-item-selected', theItem)
      },
      itemVisible (item) {
        let currentName = item.name.toLowerCase()
        let currentInput = this.keyword.toLowerCase()
        return currentName.includes(currentInput)
      },
      getProject(id) {
        ProjectService.get(id)
          .then(response => {
            this.currentProject = response.data;
            console.log('project')
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getHU(id){
        ProjectService.getProjectHU(id)
          .then(response => {
            this.hus = response.data;
            console.log('HU')
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getFilesList(id) {
        ProjectService.getProjectFiles(id)
          .then(response => {
            this.files = response.data;
            console.log('files')
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getUserList(id) {
        ProjectService.getProjectUsers(id)
          .then(response => {
            this.projectUsers = response.data;
            console.log('users')
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      onFileChange(e) {
        const selectedFile = e.target.files[0];
        this.selectedFile = selectedFile;
      },
      onUploadFile() {
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        formData.append("projectId",this.currentProject.id);
        ProjectService.uploadFile(formData)
          .then(res => {
            console.log(res);
            this.$toast.open({
              message: "Documento cargado correctamente",
              type: "success",
              duration: 4000,
              dismissible: true
            })
            this.selectedFile= "";
            this.getFilesList(this.$route.params.id);
          })
          .catch(e => {
            console.log(e);
            this.$toast.open({
              message: "Ocurrio un error al cargar el archivo",
              type: "error",
              duration: 4000,
              dismissible: true
            })
            this.selectedFile= "";
          });
      },
      checkName() {
        if(this.keyword){
          console.log(`Checking name: ${this.keyword}`);
          UserService.findByName(this.keyword)
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
      addUser(){
        console.log('send user actual')
        console.log(this.selectedItem);
        var data = {
          idUser: this.selectedItem.id,
          idProject: this.currentProject.id,
        };
        ProjectService.addProjectUser(data)
          .then(res => {
            console.log(res);
            this.$toast.open({
              message: "Usuario añadido correctamente",
              type: "success",
              duration: 4000,
              dismissible: true
            })
            this.resetSelection();
            this.getUserList(this.$route.params.id);
          })
          .catch(e => {
            console.log(e);
            this.$toast.open({
              message: "Ocurrio un error al añadir el usuario",
              type: "error",
              duration: 4000,
              dismissible: true
            })
            this.resetSelection();
          });
      },
      newHU(){
        this.$router.push(`/addUserStory/${this.$route.params.id}`)
      }
    },
    mounted(){
      this.getProject(this.$route.params.id);
      this.getHU(this.$route.params.id);
      this.getFilesList(this.$route.params.id);
      this.getUserList(this.$route.params.id);
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
    
}
</script>

<style>
  h2{
    text-align: center;
  }
  .project-detail-view{
    text-align: start;
  }
  .upload-button{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .dropdown{
    position: relative;
    width: 100%;
  }
  .dropdown-input, .dropdown-selected{
    width: 100%;
    padding: 10px 16px;
    border: 1px solid transparent;
    background: #edf2f7;
    line-height: 1.5em;
    outline: none;
    border-radius: 8px;
  }
  .dropdown-input:focus, .dropdown-selected:hover{
    background: #fff;
    border-color: #e2e8f0;
  }
  .dropdown-input::placeholder{
    opacity: 0.7;
  }
  .dropdown-selected{
    font-weight: bold;
    cursor: pointer;
  }
  .dropdown-list{
    position: absolute;
    width: 100%;
    max-height: 500px;
    margin-top: 4px;
    overflow-y: auto;
    background: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  .dropdown-item{
    display: flex;
    width: 100%;
    padding: 11px 16px;
    cursor: pointer;
  }
  .dropdown-item:hover{
    background: #edf2f7;
  }
</style>