import React from 'react'
import styles from './App.module.css'
import "bootstrap/dist/css/bootstrap.min.css"
import FoodItems from './components/FoodItems'
import ErrorMessage from './components/ErrorMessage'
import Container from './components/Container'

function App() {

  let foodItems = ['dal', 'veg', 'roti', 'salad', 'milk']

  return (
    <>
      <Container>
        <h1 className={styles.foodHeading}>Healthy Food</h1>
        <ErrorMessage myFoodItems={foodItems}></ErrorMessage>
        <FoodItems myFoodItems={foodItems}></FoodItems>
      </Container>

      {/* <Container>
        <p>Above is the list of all healthy food items.</p>
      </Container> */}
    </>
  )
}

export default App