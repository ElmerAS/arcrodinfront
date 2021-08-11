<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por nombre"
          v-model="name" readonly/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" disabled type="button"
            @click="searchName"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-2">
      <router-link to="/addContact" class="nav-link btn btn-outline-info">Añadir</router-link>
    </div>
    <div class="col-md-6">
      <h4>Lista de Contactos</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(contact, index) in contacts"
          :key="index"
          @click="setActiveContact(contact, index)"
        >
          {{ contact.nombres }} {{ contact.apellidos }}
        </li>
      </ul>

      <button disabled class="m-3 btn btn-sm btn-danger" @click="removeAllContacts">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentContact">
        <h4>Contacto</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentContact.nombres }} {{ currentContact.apellidos }}
        </div>
        <div>
          <label><strong>Correo:</strong></label> {{ currentContact.correo }}
        </div>
        <div>
          <label><strong>Cargo:</strong></label> {{ currentContact.cargo }}
        </div>
        <div>
          <label><strong>Sucursal:</strong></label> {{ currentContact.sucursal }}
        </div>

        <!--<a class="badge badge-warning"
          :href="'/contact/' + currentContact._id"
        >
          Editar
        </a>-->
      </div>
      <div v-else>
        <br />
        <p>Por favor elige un Contacto...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ContactService from "../../services/ContactDataService";
export default {
  name: "contact-list",
  data() {
    return {
      contacts: [],
      currentContact: null,
      currentIndex: -1,
      name: "",
      projects:[]
    };
  },
  methods: {
    retrieveContacts() {
      ContactService.getAll()
        .then(response => {
          this.contacts = response.data;
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveContacts();
      this.currentContact = null;
      this.currentIndex = -1;
    },

    setActiveContact(contact, index) {
      this.currentContact = contact;
      this.currentIndex = index;
    },

    removeAllContacts() {
      ContactService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      ContactService.findByName(this.name)
        .then(response => {
          this.contacts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveContacts();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>