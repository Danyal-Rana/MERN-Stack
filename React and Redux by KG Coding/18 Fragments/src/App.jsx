import React, { useState } from 'react'
import styles from './App.module.css'
import "bootstrap/dist/css/bootstrap.min.css"
import FoodItems from './components/FoodItems'
import ErrorMessage from './components/ErrorMessage'
import Container from './components/Container'
import FoodInput from './components/FoodInput'

function App() {

  let foodItems = ['dal', 'veg', 'roti', 'salad', 'milk'];

  const [textToShow, useTextState] = useState("Food item entered by user is: ");

  const handleOnChange = (event) => {
    console.log(event.target.value);
    useTextState(event.target.value);
  }

  return (
    <>
      <Container>
        <h1 className={styles.foodHeading}>Healthy Food</h1>
        <ErrorMessage myFoodItems={foodItems}></ErrorMessage>
        <FoodInput handleOnChange={handleOnChange}></FoodInput>
        <p>{textToShow}</p>
        <FoodItems myFoodItems={foodItems}></FoodItems>
      </Container>

      {/* <Container>
        <p>Above is the list of all healthy food items.</p>
      </Container> */}
    </>
  )
}

export default App