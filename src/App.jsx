import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'


function App() {
  return (
    <>
    <>
     <BrowserRouter>
     <Navbar />
     <Routes>
     
     <Route path="/recipeform" element={<RecipeForm/>}/>
     <Route path="/recipelist" element={<RecipeList/>}/>
      
     </Routes>


     </BrowserRouter>
    </>
    </>
  )
}

export default App