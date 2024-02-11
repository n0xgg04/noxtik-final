import axios from "axios";
import env from "@/config/env";

const iaxios = axios.create({
  baseURL: env.BASE_URL,
  headers: {
    "User-Agent": "NoxInfinity-NoxTik",
  },
  timeout: 12000,
  method: "get",
});

export default iaxios;
