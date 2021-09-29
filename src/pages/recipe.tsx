import IRecipe from "../models/recipe"
import Recipe from '../components/recipe'
import React, { useContext, useEffect, useState } from 'react';

import {useParams} from 'react-router'

const fetchRecipe= async (id: number, setM: React.Dispatch<React.SetStateAction<IRecipe | undefined>>) => {
    // const result = await fetch('local_api/categories.json')
    // const result = await fetch(`https://cookbook-test.azurewebsites.net/api/recipe/${id}?`)
    const result = await fetch('/local_api/recipes/schedule.json')

    const r = 
        result.text()
        .then((s) =>
            {
            const x: IRecipe = JSON.parse(s)
            setM(x)
            }
        )
    };


const RecipePage = () =>{
    const { id } = useParams<{id: string}>();
    const rId = +id
    const [recipe, setRecipe] = useState<IRecipe>()
    useEffect(() =>{
        fetchRecipe(rId, setRecipe)
    }, [])
    return (
        <div> 
            {recipe != null && <Recipe recipe={recipe} /> }
        </div>)
}


export default RecipePage
