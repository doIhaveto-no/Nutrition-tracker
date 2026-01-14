import express from "express";
import { type Router } from "express";
import mariadb from 'mariadb';
import dotenv from "dotenv";
import schemas from "../schemas.ts";
import Joi from "joi";
import { type Ingredient, type Ingredients } from "../types.ts";

dotenv.config();

const router: Router = express.Router();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT: number = parseInt(process.env.DB_PORT || '3306');

const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'nutrition_tracker';

async function createConnection() {
    return await mariadb.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        allowPublicKeyRetrieval: true
    });
}

router.route('/ingredients').get(async (req, res) => { // Get all ingredients
    const conn = await createConnection();
    try {
        const response = await conn.query(`SELECT * FROM ingredients;`);
        Joi.assert(response, schemas.ingredients);

        res.status(200);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The database returned an invalid reponse" });
    } finally {
        conn.end();
    }
}).post(async (req, res) => { // Add an ingredient
    const insert: Ingredient | Ingredients = req.body;
    let ingredient: Ingredient | null;
    let ingredients: Ingredients | null;

    // Check if multiple ingredients or one
    try { ingredient = Joi.attempt(insert, schemas.ingredient); }
    catch { ingredient = null; }

    try { ingredients = Joi.attempt(insert, schemas.ingredients); }
    catch { ingredients = null; }

    // Send query and return result/handle errors
    const conn = await createConnection();
    try {
        const query = 'INSERT INTO ingredients (name_sr, name_en, kcal, protein, carbohydrates, fats, type) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *;';
        const dbValues: Array<Array<string | number>> = [];

        if (ingredient) {
            const response: Ingredients = await conn.query(query, [ingredient.name_sr, ingredient.name_en, ingredient.kcal, ingredient.protein, ingredient.carbohydrates, ingredient.fats, ingredient.type]);
            Joi.assert(response, schemas.ingredients);

            res.status(201);
            res.json(response[0]);
        } else if (ingredients) {
            ingredients.forEach(ingredient => {
                const vals = [ingredient.name_sr, ingredient.name_en, ingredient.kcal, ingredient.protein, ingredient.carbohydrates, ingredient.fats, ingredient.type];
                dbValues.push(vals);
            });

            const response: Ingredients = await conn.batch(query, dbValues);
            Joi.assert(response, schemas.ingredients);

            res.status(201);
            res.json(response);
        } else {
            console.error("Couldn't resolve POST /api/ingredients request body");
            res.status(400);
            res.json({ error: "Invalid request body" });
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The server couldn't add ingredient or returned an invalid response" });
    } finally {
        conn.end();
    }
});

router.route('/ingredients/search').get(async (req, res) => { // Search ingredient by name or type
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
    let db_query = 'SELECT * FROM ingredients WHERE ';
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
        const response: Ingredients = await conn.query(db_query, db_values);
        Joi.assert(response, schemas.ingredients);

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

router.route('/ingredients/:id').get(async (req, res) => {
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
        const response: Ingredients = await conn.query(`SELECT * FROM ingredients WHERE id=${id};`);
        Joi.assert(response, schemas.ingredients);
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

export default router;