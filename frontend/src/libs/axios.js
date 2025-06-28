import axios from "axios";

const BASE_URL = "/api/v1";

export const apiV1 = axios.create({
  baseURL: BASE_URL,
});
