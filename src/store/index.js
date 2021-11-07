// import Vuex from "vuex";
import { createStore } from "vuex";
import { apiServer } from "../utils/api";
import { Storage } from "@capacitor/storage";

const getItem = async (name) => {
  const { value } = await Storage.get({ key: name });
  return value;
};

let store = createStore({
  state: {
    token: async () => getItem("access") || "",
    status: "",
    articles: [],
    isAuth: true,
    articleId: "",
    fromLink: "",
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
      state.status = "success";
      state.isAuth = true;
    },
    AUTH_ERROR: (state) => {
      state.status = "";
      state.isAuth = false;
    },
    AUTH_OK: (state) => {
      state.status = "auth";
    },
    UPDATE_LINK: (state, link) => {
      state.fromLink = link;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token && state.isAuth,
    authStatus: (state) => state.status,
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        // commit("AUTH_ERROR");

        apiServer({ url: "auth/jwt/create/", data: user, method: "POST" })
          .then(async (resp) => {
            const token = resp.data.access;
            // localStorage.setItem("access", token);
            await Storage.set({
              key: "access",
              value: token,
            });
            // Add the following line:
            apiServer.defaults.headers.authorization = `Bearer ${token}`;
            commit("AUTH_SUCCESS", resp);
            // dispatch("USER_REQUEST");
            resolve(resp);
          })
          .catch(async (err) => {
            commit("AUTH_ERROR", err);
            // localStorage.removeItem("access");
            await Storage.remove({ key: "access" });
            reject(err);
          });
      });
    },
    REGISTER_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        // register user
        apiServer({ url: "auth/users/", data: user, method: "POST" })
          .then(() => {
            // create jwt token
            apiServer({
              url: "auth/jwt/create/",
              data: user,
              method: "POST",
            }).then(async (resp) => {
              const token = resp.data.access;
              // localStorage.setItem("access", token);
              await Storage.set({
                key: "access",
                value: token,
              });
              apiServer.defaults.headers.authorization = `Bearer ${token}`;
              commit("AUTH_SUCCESS", resp);
              resolve(resp);
            });
          })
          .catch(async (err) => {
            commit("AUTH_ERROR", err);
            // localStorage.removeItem("access");
            await Storage.remove({ key: "access" });
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise((resolve) => {
        commit("AUTH_ERROR");
        // localStorage.removeItem("access");
        Storage.remove({ key: "access" });
        // remove the axios default header
        delete apiServer.defaults.headers.authorization;
        resolve();
      });
    },
  },
});

export default store;
