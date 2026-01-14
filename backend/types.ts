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

export type { Ingredient, Ingredients };