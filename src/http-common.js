import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8000/api",
  baseURL: "https://arcrodinback.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
