import Joi from "joi";

const ingredient = Joi.object({
    id: Joi.number().integer().min(1).optional(),
    name_sr: Joi.string().max(24).required(),
    name_en: Joi.string().max(24).required(),
    kcal: Joi.number().positive().unit('kcal').required(),
    protein: Joi.number().min(0).unit('g').required(),
    carbohydrates: Joi.number().min(0).unit('g').required(),
    fats: Joi.number().min(0).unit('g').required(),
    type: Joi.string().valid('fruit', 'vegetable', 'animal_product').insensitive().required()
});

const ingredients = Joi.array().items(ingredient);

const food = Joi.object({
    id: Joi.number().integer().min(1).optional(),
    name_sr: Joi.string().max(24).required(),
    name_en: Joi.string().max(24).required(),
    kcal: Joi.number().positive().unit('kcal').required(),
    protein: Joi.number().min(0).unit('g').required(),
    carbohydrates: Joi.number().min(0).unit('g').required(),
    fats: Joi.number().min(0).unit('g').required()
});

const foods = Joi.array().items(food);

const foodIngredient = Joi.object({
    food_id: Joi.number().integer().min(1).optional(),
    ingredient_id: Joi.number().integer().min(1).optional(),
    grams: Joi.number().min(0).required()
}).or('food_id', 'ingredient_id');

const foodIngredients = Joi.array().items(foodIngredient);

const error = Joi.object({
    error: Joi.string().required()
});

export default { ingredient, ingredients, food, foods, foodIngredient, foodIngredients, error };