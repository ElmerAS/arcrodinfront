import http from "../http-common";

class ClientDataService {
  getAll() {
    return http.get("/contacto/list");
  }

  get(id) {
    return http.get(`/contacto/findone/${id}`);
  }

  create(data) {
    return http.post("/contacto/add", data);
  }

  update(id, data) {
    return http.put(`/contacto/updatebyid/${id}`, data);
  }

  delete(id) {
    return http.delete(`/contacto/deletebyid/${id}`);
  }

  deleteAll() {
    return http.delete(`/contacto/deleteall`);
  }

  findByName(name) {
    return http.get(`/contacto/findbyname?name=${name}`);
  }
}

export default new ClientDataService();
