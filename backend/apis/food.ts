import express from "express";
import { type Router } from "express";
import schemas from "../schemas.ts";
import Joi from "joi";
import { type Food, type Foods } from "../types.ts";
import { createConnection } from "./db_utils.ts";


const TABLE_NAME = 'foods';

const router: Router = express.Router();

router.route(`/${TABLE_NAME}`).get(async (req, res) => { // Get all foods
    const conn = await createConnection();
    try {
        const response = await conn.query(`SELECT * FROM ${TABLE_NAME};`);
        Joi.assert(response, schemas.foods);

        res.status(200);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The database returned an invalid reponse" });
    } finally {
        conn.end();
    }
}).post(async (req, res) => { // Add an food
    const insert: Food | Foods = req.body;
    let food: Food | null;
    let foods: Foods | null;

    // Check if multiple foods or one
    try { food = Joi.attempt(insert, schemas.food); }
    catch { food = null; }

    try { foods = Joi.attempt(insert, schemas.foods); }
    catch { foods = null; }

    // Send query and return result/handle errors
    const conn = await createConnection();
    try {
        const query = `INSERT INTO ${TABLE_NAME} (name_sr, name_en, kcal, protein, carbohydrates, fats) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;`;
        const dbValues: Array<Array<string | number>> = [];

        if (food) {
            const response: Foods = await conn.query(query, [food.name_sr, food.name_en, food.kcal, food.protein, food.carbohydrates, food.fats]);
            Joi.assert(response, schemas.foods);

            res.status(201);
            res.json(response[0]);
        } else if (foods) {
            foods.forEach(food => {
                const vals = [food.name_sr, food.name_en, food.kcal, food.protein, food.carbohydrates, food.fats];
                dbValues.push(vals);
            });

            const response: Foods = await conn.batch(query, dbValues);
            Joi.assert(response, schemas.foods);

            res.status(201);
            res.json(response);
        } else {
            console.error(`Couldn't resolve POST /api/${TABLE_NAME} request body`);
            res.status(400);
            res.json({ error: "Invalid request body" });
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The server couldn't add food or returned an invalid response" });
    } finally {
        conn.end();
    }
});

router.route(`/${TABLE_NAME}/search`).get(async (req, res) => { // Search food by name or type
    // Validate parameters
    if (!(req.query.query || req.query.type)) {
        res.status(400);
        res.json({ error: "Request is missing parameters query or type" });
    }
    if (!(['sr', 'en'].includes((req.query.lang || 'sr').toString()))) {
        res.status(400);
        res.json({ error: `Invalid language ${req.query.lang}` });
    }
    
    // Init connection and query
    const conn = await createConnection();
    let db_query = `SELECT * FROM ${TABLE_NAME} WHERE `;
    const db_values = [];

    // Build query
    if (req.query.query) {
        if (db_values.length > 0) db_query += ' AND ';
        db_query += `${conn.escapeId(`name_${req.query.lang || 'sr'}`)} LIKE ?`;
        db_values.push(`%${req.query.query}%`);
    } if (req.query.type) {
        if (db_values.length > 0) db_query += ' AND ';
        db_query += 'type = ?';
        db_values.push(req.query.type);
    }

    // Search and return results/handle errors
    try {
        const response: Foods = await conn.query(db_query, db_values);
        Joi.assert(response, schemas.foods);

        res.status(200);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The server couldn't perform a search" });
    } finally {
        conn.end();
    }
});

router.route(`/${TABLE_NAME}/:id`).get(async (req, res) => {
    let id: number;
    try {
        id = parseInt(req.params.id);
    } catch {
        res.status(400);
        res.json({ error: "Id must be an integer" });
        return;
    }

    const conn = await createConnection();
    try {
        const response: Foods = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id=${id};`);
        Joi.assert(response, schemas.foods);
        if (response.length > 0) {
            res.status(200);
            res.json(response[0]);
        } else {
            res.status(404);
            res.json({ error: "Requested id does not exist" });
        }
    } finally {
        conn.end();
    }
});

router.route(`/${TABLE_NAME}/:id/ingredients`).get(async (req, res) => {
    let id: number;
    try {
        id = parseInt(req.params.id);
    } catch {
        res.status(400);
        res.json({ error: "Id must be an integer" });
        return;
    }

    const conn = await createConnection();
    try {
        const response: Foods = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id=${id};`);
        Joi.assert(response, schemas.foods);
        
        if (response.length > 0) {
            res.status(200);
            res.json(response[0]);
        } else {
            res.status(404);
            res.json({ error: "Requested id does not exist" });
        }
    } finally {
        conn.end();
    }
}).post();

export default router;