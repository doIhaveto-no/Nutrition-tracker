import express from "express";
import { type Express } from "express";
import ingredientsRouter from "./apis/ingredients"

const app: Express = express();
const PORT: number = 5173;

app.use(express.json());

app.use()

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default {app, server};