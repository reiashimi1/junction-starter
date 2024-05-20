import Axios from "axios";
import _ from "lodash";
import { store } from "@/app/GlobalRedux/store";
import { logout } from "@/app/GlobalRedux/Features/authSlice";
import { API_URL } from "@/helpers/APIServices/API_URL";

let isTokenRefreshing = false;
let failedRequests = [];

const ImageAPI = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

const processFailedRequests = (error, accessToken) => {
  failedRequests.forEach((promise) =>
    error ? promise.reject(error) : promise.resolve(accessToken),
  );
  failedRequests = [];
};

const getAuth = () => {
  const state = store.getState();
  let accessToken = _.get(state, "authSlice.accessToken", null);
  return `Bearer ${accessToken}`;
};

ImageAPI.interceptors.request.use(
  (config) => {
    const authentication = getAuth();

    if (authentication) {
      config.headers.Authorization = authentication;
    }
    return config;
  },
  async () => {
    const { dispatch } = store;
    await dispatch(logout());
    window.location.reload();
  },
);

ImageAPI.interceptors.response.use(
  (res) => res,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isTokenRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isTokenRefreshing = true;

      if (originalRequest.headers.Authorization !== getAuth()) {
        originalRequest.headers.Authorization = getAuth();
        return Promise.resolve(API(originalRequest));
      }

      const state = store.getState();
      let refreshToken = _.get(state, "authSlice.refreshToken", null);

      return new Promise((resolve, reject) => {
        API.post("/oauth/token/refresh", {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        })
          .then((response) => {
            console.log(response);
            const { dispatch } = store;
            // dispatch(authenticate(auth));
            processFailedRequests(null, response.data.data.accessToken);
            resolve(API(originalRequest));
          })
          .catch(async (error) => {
            processFailedRequests(error, null);
            const { dispatch } = store;
            await dispatch(logout());
            window.location = "/";
            reject(error);
          })
          .finally(() => {
            isTokenRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  },
);

export default ImageAPI;
