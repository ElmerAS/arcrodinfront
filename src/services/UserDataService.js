import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/usuario/list");
  }

  get(id) {
    return http.get(`/usuario/findone/${id}`);
  }

  create(data) {
    return http.post("/usuario/add", data);
  }

  update(id, data) {
    return http.put(`/usuario/updatebyid/${id}`, data);
  }

  delete(id) {
    return http.delete(`/usuario/deletebyid/${id}`);
  }

  /*deleteAll() {
    return http.delete(`/usuario/deleteall`);
  }*/

  findByName(name) {
    return http.get(`/usuario/findbyname?name=${name}`);
  }
}

export default new UserDataService();
