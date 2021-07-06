import axios from "axios";

export default {
  // API request to server side
  getPublicKey() {
    return axios.get("/stripe/getpublickey");
  },
  createPaymentIntent(data) {
    return axios.post("/stripe/createpaymentintent", data);
  },
};
