import Joi from "joi";

const ingredient = Joi.object({
    id: Joi.number().integer().positive().optional(),
    name_sr: Joi.string().max(24).required(),
    name_en: Joi.string().max(24).required(),
    kcal: Joi.number().positive().unit('kcal').required(),
    protein: Joi.number().min(0).unit('g').required(),
    carbohydrates: Joi.number().min(0).unit('g').required(),
    fats: Joi.number().min(0).unit('g').required(),
    type: Joi.string().valid('fruit', 'vegetable', 'animal_product').insensitive().required()
});

const ingredients = Joi.array().items(ingredient);

export default { ingredient, ingredients };