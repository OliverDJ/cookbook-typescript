import logo from './logo.svg';
import './App.scss';

import './styles/_method.scss'
// import TestComp from "./components/test"
import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

// import IMethod from "./models/method"
import IRecipe from "./models/recipe"

import Recipe from "./components/recipe"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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



const defaultMethod : IRecipe= 
{
  // Title: "none",
  // Description: "none",
  // IngredientQuantities: []
  Id: 0,
  Name: "TBD",
  CreatedAt: new Date("2019-01-16"),
  Methods: [],
  Spiciness: 0
}

function App() {
  const [recipe, setRecipe] = useState<IRecipe>(defaultMethod)
  
  // useEffect(() =>{
  //   console.log("starting")
  //   fetchData(setMethod)
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => fetchRecipe(setRecipe)}>Pressme</Button>
        <Recipe 
          Id ={recipe.Id}
          Name = {recipe.Name}
          CreatedAt = {recipe.CreatedAt}
          Methods = {recipe.Methods}
          Spiciness = {recipe.Spiciness}
        />
        {/* <Method Title={method.Title} Description={method.Description} IngredientQuantities={method.IngredientQuantities} ></Method> */}
      </header>
    </div>
  );
}

export default App;
