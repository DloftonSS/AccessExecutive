import axios from "axios";

export default {
  // API request to server side
  getAmmoBrands(token) {
    return axios.get("/api/getammobrands", token);
  },
  getAmmoTypes(token) {
    return axios.get("/api/getammotypes", token);
  },
  getFirearmBrands(token) {
    return axios.get("/api/getfirearmbrands", token);
  },
  newCategory(data, token) {
    return axios.post("/api/newcategory", data, token);
  },
  deleteCategory(id, token) {
    return axios.delete(`/api/deletecategory/${id}`, token);
  },
};
