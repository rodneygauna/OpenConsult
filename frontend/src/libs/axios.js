import axios from "axios";

const BASE_URL = "http://backend:3001/api/v1";

export const apiV1 = axios.create({
  baseURL: BASE_URL,
});
