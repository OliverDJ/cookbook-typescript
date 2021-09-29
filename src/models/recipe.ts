
import IIngredientQuantity from './ingredientquantity'
import IMethod from "./method"
import ICategory from './category'
import IDuration from './duration'
import ISubdivision from './subdivision'

interface IRecipe{
    Id: number,
    Name: string,
    CreatedAt: Date,
    Methods: IMethod [],
    Spiciness: number,
    IngredientQuantities: IIngredientQuantity[],
    Category: ICategory
    Duration: IDuration
    Schedule: ISubdivision[]
}

export default IRecipe;
