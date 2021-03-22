

import {useParams} from 'react-router'

import React, { useContext, useEffect, useState } from 'react';

import IRecipeThumbnail from '../models/recipethumbnail' 
import _renderRecipeThumbnails from "../components/recipethumbnail"
import { write } from 'fs';

const fetchRecipes = async (name : string, setM: React.Dispatch<React.SetStateAction<IRecipeThumbnail[]>>) => {
    // const result = await fetch('../local_api/recipethumbnails.json')
    const result = await fetch(`https://cookbook-test.azurewebsites.net/api/recipes/category/${name}`)
    console.log("-> name ", name)
    const r = 
        result.text()
        .then((s) =>
            {
            console.log("s", s)
            const x: IRecipeThumbnail[] = JSON.parse(s)
            console.log(x)
            setM(x)
            console.log(typeof(x))
            }
        )
    };

const defaultRecipeThumbnails : IRecipeThumbnail[]=[]

const RecipesByCategory = () =>{
    const { name } = useParams<{name: string}>();
    const [recipes, setRecipies] = useState<IRecipeThumbnail[]>(defaultRecipeThumbnails)
    useEffect(() =>{
        console.log("starting")
        fetchRecipes(name, setRecipies)
    }, [])
    return (
        <div>
            {/* Recipes for {name}
            <p>{recipes.Name}</p> */}
            {_renderRecipeThumbnails(recipes)}
        </div>)
    // return (<div>Recipes for { name }</div>)
}


export default RecipesByCategory



// const fetchRecipe = async (setM: React.Dispatch<React.SetStateAction<IRecipe>>) => {
//     const re sult = await fetch('test.json')
//     const r = 
//       result.text()
//         .then((s) =>
//           {
//             const x: IRecipe = JSON.parse(s)
//             console.log(x)
//             setM(x)
//             console.log(typeof(x))
            
//           }
//         )
//   };
// const defaultMethod : IRecipe= 
// {
//   Id: 0,
//   Name: "TBD",
//   CreatedAt: new Date("2019-01-16"),
//   Methods: [],
//   Spiciness: 0
// }