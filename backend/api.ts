import express from "express";
import { type Express } from "express";
import ingredientsRouter from "./apis/ingredients.ts";
import foodsRouter from "./apis/foods.ts";

const app: Express = express();
const PORT: number = 5173;

app.use(express.json());

app.use('/api', ingredientsRouter, foodsRouter);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

;;;;;;;;;;;;;;;;;;;;;;;

export default {app, server};