import logo from './logo.svg';
import './App.scss';

import './styles/_method.scss'
// import TestComp from "./components/test"
import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

// import IMethod from "./models/method"
import IRecipe from "./models/recipe"

import Recipe from "./components/recipe"
// import Category from "./components/category"
import _renderCategories from "./components/category"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ICategory from './models/category';

const add = (x: number): number =>{return x + 1}
const subtract = (x: number): number =>{return x - 1}
const _onClickF = (setState: React.Dispatch<React.SetStateAction<number>>, f:(c: number) => number, x: number) => {setState(f(x))}

const fetchRecipe = async (setM: React.Dispatch<React.SetStateAction<IRecipe>>) => {
  const result = await fetch('test.json')
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

const fetchCategories = async (setM: React.Dispatch<React.SetStateAction<ICategory[]>>) => {
  const result = await fetch('local_api/categories.json')
  // const result = await fetch('https://cookbook-test.azurewebsites.net/api/categories/')
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

const defaultMethod : IRecipe= 
{
  Id: 0,
  Name: "TBD",
  CreatedAt: new Date("2019-01-16"),
  Methods: [],
  Spiciness: 0
}


const defaultCategoryList : ICategory[]= []
function App() {
  // const [recipe, setRecipe] = useState<IRecipe>(defaultMethod)
  const [categories, setCategories] = useState<ICategory[]>(defaultCategoryList)
  
  useEffect(() =>{
    console.log("starting")
    fetchCategories(setCategories)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* <Button onClick={() => fetchRecipe(setRecipe)}>Pressme</Button> */}
        {/* <Button onClick={() => fetchCategories(setCategories)}>Pressme</Button> */}
        {_renderCategories(categories)}
        {/* <Categories categories={categories}></Categories> */}
        {/* {categories.map (
          (c ) => 
            <Category 
              Id = {c.Id}
              Name = {c.Name}
              Description = {c.Description}
            />) } */}
        {/* <Recipe 
          Id ={recipe.Id}
          Name = {recipe.Name}
          CreatedAt = {recipe.CreatedAt}
          Methods = {recipe.Methods}
          Spiciness = {recipe.Spiciness}
        /> */}
        {/* <Method Title={method.Title} Description={method.Description} IngredientQuantities={method.IngredientQuantities} ></Method> */}
      </header>
    </div>
  );
}

export default App;
