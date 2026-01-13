import api from "./backend/api.ts";
import viteExpress from "vite-express";

viteExpress.bind(api.app, api.server);