

import IRecipe from "../models/recipe"

import Method from './method'
const Recipe = (recipe: IRecipe): JSX.Element => {

    return (
        <div>
            <p>{recipe.Name}</p>
            {
            recipe.Methods.map((method)=> 
                <Method
                    Title={method.Title} 
                    Description={method.Description} 
                    IngredientQuantities={method.IngredientQuantities}
                />)
            }
        </div>
    );
}


export default Recipe