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


import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';




import Home from './pages/home'
import Categories from './pages/categories'
import RecipesByCategory from './pages/recipes-by-category'
import RecipePage from './pages/recipe'

const _onClickF = (setState: React.Dispatch<React.SetStateAction<number>>, f:(c: number) => number, x: number) => {setState(f(x))}


const defaultCategoryList : ICategory[]= []
function App() {


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
          </ul>
          <div>
            <Switch>
              <Route exact path= "/" component = {Home}/>
              <Route exact path= "/categories" component = {Categories} />
              <Route exact path= "/categories/:name" component = {RecipesByCategory} />
              <Route exact path= "/recipe/:id" component = {RecipePage} />
            </Switch>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;




// const [categories, setCategories] = useState<ICategory[]>(defaultCategoryList)
  
//   useEffect(() =>{
//     console.log("starting")
//     fetchCategories(setCategories)
//   }, [])

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           {/* <Button onClick={() => fetchRecipe(setRecipe)}>Pressme</Button> */}
//           {/* <Button onClick={() => fetchCategories(setCategories)}>Pressme</Button> */}
//           {_renderCategories(categories)}
//           {/* <Categories categories={categories}></Categories> */}
//           {/* {categories.map (
//             (c ) => 
//             <Category 
//             Id = {c.Id}
//             Name = {c.Name}
//             Description = {c.Description}
//           />) } */}
//           {/* <Recipe 
//             Id ={recipe.Id}
//             Name = {recipe.Name}
//             CreatedAt = {recipe.CreatedAt}
//             Methods = {recipe.Methods}
//             Spiciness = {recipe.Spiciness}
//           /> */}
//           {/* <Method Title={method.Title} Description={method.Description} IngredientQuantities={method.IngredientQuantities} ></Method> */}
//         </header>
//       </div>
//     </Router>
