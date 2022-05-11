import { useAuthStore } from "./../features/auth/stores/auth";
import Axios from "axios";

import { API_URL } from "../config";

const authRequestInterceptor = async (config: any) => {
  const token = await useAuthStore.getState().user?.getIdToken();

  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = "application/json";

  return config;
};

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
