import express from "express";
import { type Router } from "express";
import schemas from "../schemas.ts";
import Joi from "joi";
import { type FoodIngredient, type FoodIngredients, type Ingredient, type Ingredients } from "../types.ts";
import { createConnection } from "./dbUtils.ts";
import { validateId, validateLimit, validateOrder, validatePage, validateSort } from "./apiUtils.ts";


const TABLE_NAME = 'ingredients';

const router: Router = express.Router();

// UPOZORENJE - COGNITOHAZARD
// Najveće kršenje DRY ikada ispod
router.route(`/${TABLE_NAME}`).get(async (req, res) => { // Get all ingredients
    const limit = validateLimit(req, res);
    if (limit == -1) return;

    const page = validatePage(req, res);
    if (page == -1) return;
    

    const conn = await createConnection();
    try {
        const response = await conn.query(`SELECT * FROM ${TABLE_NAME} OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY;`);
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
        const query = `INSERT INTO ${TABLE_NAME} (name_sr, name_en, kcal, protein, carbohydrates, fats, type) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *;`;
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
            console.error(`Couldn't resolve POST /api/${TABLE_NAME} request body`);
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

router.route(`/${TABLE_NAME}/search`).get(async (req, res) => { // Search ingredient by name or type
    // Validate parameters
    if (!(req.query.query || req.query.type)) {
        res.status(400);
        res.json({ error: "Request is missing parameters query or type" });
    }
    if (!(['sr', 'en'].includes((req.query.lang || 'sr').toString()))) {
        res.status(400);
        res.json({ error: `Invalid language ${req.query.lang}` });
    }

    const limit = validateLimit(req, res);
    if (limit == -1) return;

    const page = validatePage(req, res);
    if (page == -1) return;

    const sort = validateSort(req, res, true);
    if (sort == '') return;

    const order = validateOrder(req, res);
    if (order == '') return;
    

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
    } db_query += ` ORDER BY ${conn.escapeId(sort)} ${order.toUpperCase()} OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY;`;


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

router.route(`/${TABLE_NAME}/:id`).get(async (req, res) => {
    const id = validateId(req, res);
    if (id == -1) return;


    const conn = await createConnection();
    try {
        const response: Ingredients = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id=${id};`);
        Joi.assert(response, schemas.ingredients);
        if (response.length > 0) {
            res.status(200);
            res.json(response[0]);
        } else {
            res.status(404);
            res.json({ error: "Requested id does not exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The server couldn't get ingredient or returned an invalid response" });
    } finally {
        conn.end();
    }
}).put(async (req, res) => {
    const id = validateId(req, res);
    if (id == -1) return;


    const conn = await createConnection();
    try {
        const response_old: Ingredients = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id=${id};`);
        Joi.assert(response_old, schemas.ingredients);
        if (response_old.length > 0) {
            let food: Ingredient | null = req.body;
            
            try { Joi.assert(food, schemas.food); }
            catch { food = null; }
            
            if (food) {
                const response_new: Ingredients = await conn.query(`REPLACE INTO ${TABLE_NAME} VALUES (${id}, ?, ?, ?, ?, ?, ?, ?) RETURNING *;`, [food.name_sr, food.name_en, food.kcal, food.protein, food.carbohydrates, food.fats, food.type]);
                Joi.assert(response_new, schemas.ingredients);
                
                res.status(201);
                res.json([response_old[0], response_new[0]]);
            } else {
                console.error(`Couldn't resolve POST /api/${TABLE_NAME} request body`);
                res.status(400);
                res.json({ error: "Invalid request body" });
            }
        } else {
            res.status(404);
            res.json({ error: "Requested id does not exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The server couldn't update ingredient or returned an invalid response" });
    } finally {
        conn.end();
    }
}).delete(async (req, res) => {
    const id = validateId(req, res);
    if (id == -1) return;


    const conn = await createConnection();
    try {
        const response_check: Ingredients = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id=${id}`);
        Joi.assert(response_check, schemas.ingredients);
        if (response_check.length > 0) {
            const response: Ingredients = await conn.query(`DELETE FROM ${TABLE_NAME} WHERE id=${id} RETURNING *`);
            Joi.assert(response, schemas.ingredients);

            res.status(200);
            res.json(response);
        } else {
            res.status(404);
            res.json({ error: "Requested id does not exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The server couldn't delete ingredient or returned an invalid response"});
    } finally {
        conn.end();
    }
});

router.route(`/${TABLE_NAME}/:id/foods`).get(async (req, res) => {
    const id = validateId(req, res);
    if (id == -1) return;

    const limit = validateLimit(req, res);
    if (limit == -1) return;

    const page = validatePage(req, res);
    if (page == -1) return;


    const conn = await createConnection();
    try {
        const response_check: Ingredients = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id=${id}`);
        Joi.assert(response_check, schemas.ingredients);
        if (response_check.length > 0) {
            const response: FoodIngredients = await conn.query(`SELECT * FROM food_ingredients WHERE ingredient_id=${id}`);
            Joi.assert(response, schemas.ingredients);

            res.status(200);
            res.json(response);
        } else {
            res.status(404);
            res.json({ error: "Requested id does not exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: "The server couldn't get foods with ingredient or returned an invalid response"});
    } finally {
        conn.end();
    }
});

export default router;