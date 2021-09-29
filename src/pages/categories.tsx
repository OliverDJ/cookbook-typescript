import ICategory from "../models/category"

import React, { useContext, useEffect, useState } from 'react';

import {useParams} from 'react-router'
import _renderCategories from "../components/category"

const fetchCategories = async (setM: React.Dispatch<React.SetStateAction<ICategory[]>>) => {
    // const result = await fetch('local_api/categories.json')
    const result = await fetch('https://cookbook-test.azurewebsites.net/api/categories/')
    
    const r = 
        result.text()
        .then((s) =>
            {
            const x: ICategory[] = JSON.parse(s)
            console.log(x)
            setM(x)
            console.log(typeof(x))
            
            }
        )
    };


const defaultCategoryList : ICategory[]= []

const CategoriesPage = () =>{
    const [categories, setCategories] = useState<ICategory[]>(defaultCategoryList)
    useEffect(() =>{
        console.log("starting")
        fetchCategories(setCategories)
    }, [])
    return (
        <div>
            {_renderCategories(categories)}
        </div>)
}


export default CategoriesPage
