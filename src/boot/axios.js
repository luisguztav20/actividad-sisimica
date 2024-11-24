import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "https://couchdbbackend.esaapp.com",
  auth: {
    username: "volcanesfisica",
    password: "ilamatepec471FMO$&universidad",
  },
});

export default boot(({ app }) => {});

export { api };
