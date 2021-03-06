
enum MeasurementType {
    Gram = "Gram",
    Piece = "Piece",
    Cup = "Cup",
    Teaspoon ="Teaspoon",
    Tablespoon = "Tablespoon"
}

interface Ingredient {
    Id: number,
    Name: string

}

interface Measurement {
    Case: MeasurementType
    Fields: number []
}

interface IIngredientQuantity {
    Ingredient: Ingredient,
    Measurement: Measurement
}

export default IIngredientQuantity;
