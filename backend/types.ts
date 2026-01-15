type Ingredient = {
    id?: number,
    name_sr: string,
    name_en: string,
    kcal: number,
    protein: number,
    carbohydrates: number,
    fats: number,
    type: string
}

type Ingredients = Array<Ingredient>

type Food = {
    id?: number,
    name_sr: string,
    name_en: string,
    kcal: number,
    protein: number,
    carbohydrates: number,
    fats: number
}

type Foods = Array<Food>

type FoodIngredient = {
    food_id: number,
    ingredient_id: number,
    grams: number
}

type FoodIngredients = Array<FoodIngredient>

type Error = {
    error: string
}

export type { Ingredient, Ingredients, Food, Foods, FoodIngredient, FoodIngredients, Error };