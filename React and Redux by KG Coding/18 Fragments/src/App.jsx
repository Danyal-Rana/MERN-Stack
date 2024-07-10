import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import FoodItems from './components/FoodItems'
import ErrorMessage from './components/ErrorMessage'

function App() {

  let foodItems = ['dal', 'veg', 'roti', 'salad', 'milk']

  return (
    <React.Fragment>
      <h1>Healthy Food</h1>
      <ErrorMessage myFoodItems={foodItems}></ErrorMessage>
      <FoodItems myFoodItems={foodItems}></FoodItems>
    </React.Fragment>
  )
}

export default App