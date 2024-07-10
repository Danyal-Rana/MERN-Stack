import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  let foodItems = ['dal', 'veg', 'roti', 'salad', 'milk']

  return (
    <React.Fragment>
      <h1>Healthy Food</h1>
      <ul className="list-group">
        { foodItems.length ===0 ? <h3>I'm still hungry</h3> :
        foodItems.map((item) => {
          return <li key={item} className="list-group-item">{item}</li>;
        })}
        
      </ul>
    </React.Fragment>
  )
}

export default App