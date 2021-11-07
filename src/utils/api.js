import axios from "axios";
import store from "../store/index";
// import router from "../router";
import { config } from "../config/config";
import { Storage } from "@capacitor/storage";

var apiServer = axios.create({
  baseURL: config.url,

  crossdomain: true,
});

var staticFiles = axios.create({
  baseURL: "url for static files",
});

apiServer.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      store.dispatch("AUTH_LOGOUT");
      // router.push("/login");
      // console.log("UNAUTH");
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

const setToken = async () => {
  const token = await Storage.get({ key: "access" });
  if (token) {
    apiServer.defaults.headers.authorization = `Bearer ${token}`;
  }
};
setToken();

export { apiServer, staticFiles };
