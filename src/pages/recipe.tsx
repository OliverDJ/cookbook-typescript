import IRecipe from "../models/recipe"
import Recipe from '../components/recipe'
import React, { useContext, useEffect, useState } from 'react';

import {useParams} from 'react-router'
// import _renderCategories from "../components/category"

const fetchRecipe= async (id: number, setM: React.Dispatch<React.SetStateAction<IRecipe>>) => {
    // const result = await fetch('local_api/categories.json')
    const result = await fetch(`https://cookbook-test.azurewebsites.net/api/recipe/${id}?`)
    const r = 
        result.text()
        .then((s) =>
            {
            const x: IRecipe = JSON.parse(s)
            console.log(x)
            setM(x)
            console.log(typeof(x))
            }
        )
    };


const defaultRecipe : IRecipe = 
{
    Id: 0,
    Name: "TBD",
    CreatedAt: new Date("2019-01-16"),
    Methods: [],
    Spiciness: 0
}

const RecipePage = () =>{
    const { id } = useParams<{id: string}>();
    const rId = +id
    const [recipe, setRecipe] = useState<IRecipe>(defaultRecipe)
    useEffect(() =>{
        console.log("starting recipeid ", recipe.Id)
        fetchRecipe(rId, setRecipe)
    }, [])
    return (
        <div>
            <Recipe 
                Id ={recipe.Id}
                Name = {recipe.Name}
                CreatedAt = {recipe.CreatedAt}
                Methods = {recipe.Methods}
                Spiciness = {recipe.Spiciness} 
            />
        </div>)
}


export default RecipePage
