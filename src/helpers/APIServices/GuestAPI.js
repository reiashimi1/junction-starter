import Axios from "axios";
import { API_URL } from "@/helpers/APIServices/API_URL";

const GuestAPI = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export default GuestAPI;
