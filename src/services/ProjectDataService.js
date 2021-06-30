import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/projects");
  }

  get(id) {
    return http.get(`/projects/${id}`);
  }

  create(data) {
    return http.post("/projects", data);
  }

  update(id, data) {
    return http.put(`/projects/${id}`, data);
  }

  delete(id) {
    return http.delete(`/projects/${id}`);
  }

  deleteAll() {
    return http.delete(`/projects`);
  }

  findByName(name) {
    return http.get(`/projects?title=${name}`);
  }

  uploadFile(data) {
    return http.post("/projectFiles/upload", data);
  }

  getProjectFiles(projectId) {
    return http.get(`/projectFiles?projectId=${projectId}`);
  }

  getProjectUsers(projectId) {
    return http.get(`/projectUsers?projectId=${projectId}`);
  }

  createProjectHU(data) {
    return http.post("/projects/createHU", data);
  }

  getProjectHU(projectId) {
    return http.get(`/projects/getProjectHU/${projectId}`);
  }

  addProjectUser(data) {
    return http.post("/projectUsers/add", data);
  }

  getProjectbyUser(userId) {
    return http.get(`/projectUsers/byUser?userId=${userId}`);
  }

  getProjectbyClient(clientId) {
    return http.get(`/projectClients/byClient?clientId=${clientId}`);
  }
}

export default new UserDataService();
