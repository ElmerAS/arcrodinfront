<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por Cliente"
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
      <router-link to="/addProforma" class="nav-link btn btn-outline-info">Añadir</router-link>
    </div>
    <div class="col-md-6">
      <h4>Lista de Proformas</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(proforma, index) in proformas"
          :key="index"
          @click="setActiveProforma(proforma, index)"
        >
          {{ proforma._id }}
        </li>
      </ul>

      <button disabled class="m-3 btn btn-sm btn-danger" @click="removeAllProformas">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentProforma">
        <h4>Proforma</h4>
        <div>
          <label><strong>Codigo:</strong></label> {{ currentProforma.codigoProforma }}
        </div>
        <div v-if="currentProforma.cliente[0]">
          <label><strong>Cliente:</strong></label> {{ currentProforma.cliente[0].razonSocial }}
        </div>
        <div v-else>
          <label><strong>Cliente:</strong></label> 
        </div>
        <div>
          <label><strong>Moneda:</strong></label> {{ currentProforma.moneda }}
        </div>
        <div>
          <label><strong>Forma de Pago:</strong></label> {{ currentProforma.formaPago }}
        </div>
        <div>
          <label><strong>Tipo:</strong></label> {{ currentProforma.tipo }}
        </div>
        <div>
          <label><strong>Fecha de Emision:</strong></label> {{ currentProforma.fechaEmision }}
        </div>
        <div>
          <label><strong>Estado:</strong></label> {{ currentProforma.estado }}
        </div>
        <div>
          <label><strong>Observacion:</strong></label> {{ currentProforma.observacion }}
        </div>

        <!--<a class="badge badge-warning"
          :href="'/editProforma/' + currentProforma._id"
        >
          Editar
        </a>-->
      </div>
      <div v-else>
        <br />
        <p>Por favor elige una proforma...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProformaService from "../../services/ProformaDataService";
export default {
  name: "proformas-list",
  data() {
    return {
      proformas: [],
      currentProforma: null,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveProformas() {
      ProformaService.getAll()
        .then(response => {
          this.proformas = response.data.proformas;
          console.log(response.data.proformas)
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProformas();
      this.currentProforma = null;
      this.currentIndex = -1;
    },

    setActiveProforma(proforma, index) {
      this.currentProforma = proforma;
      this.currentIndex = index;
    },

    removeAllProformas() {
      ProformaService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      ProformaService.findByName(this.name)
        .then(response => {
          this.proformas = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveProformas();
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