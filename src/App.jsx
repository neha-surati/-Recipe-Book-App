import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import RecipeForm from './components/RecipeForm'


function App() {
  return (
    <>
    <>
     <BrowserRouter>
     <Navbar />
     <Routes>
     
     <Route path="/recipeform" element={<RecipeForm/>}/>
      
     </Routes>


     </BrowserRouter>
    </>
    </>
  )
}

export default App