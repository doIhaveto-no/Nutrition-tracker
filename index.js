import api from "./backend/api.js";
import viteExpress from "vite-express";

viteExpress.bind(api.app, api.server);