import http from "../http-common";

class ClientDataService {
  getAll() {
    return http.get("/cliente/list");
  }

  get(id) {
    return http.get(`/cliente/findone/${id}`);
  }

  create(data) {
    return http.post("/cliente/add", data);
  }

  update(id, data) {
    return http.put(`/cliente/updatebyid/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cliente/deletebyid/${id}`);
  }

  deleteAll() {
    return http.delete(`/cliente/deleteall`);
  }

  findByName(name) {
    return http.get(`/cliente/findbyname?name=${name}`);
  }
}

export default new ClientDataService();
