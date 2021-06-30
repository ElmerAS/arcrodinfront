import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/proforma/list");
  }
  create(data) {
    return http.post("/proforma/add", data);
  }
}

export default new UserDataService();
