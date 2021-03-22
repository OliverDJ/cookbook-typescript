

import IMethod from "./method"

interface IRecipe{
    Id: number,
    Name: string,
    CreatedAt: Date,
    Methods: IMethod [],
    Spiciness: number
} 


export default IRecipe;
