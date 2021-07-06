import axios from "axios";

export default {
  // API request to server side
  getMemberStats(token) {
    return axios.get("/stats/getmemberstats", token);
  },
};
