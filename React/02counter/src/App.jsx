import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // let counter = 15;

  let [counter, setCounter] = useState(5);

  const addValue = () => {
    console.log ("Value Added", counter);
    // counter++;
    setCounter (counter++);
  }

  const removeValue = () => {
    console.log ("Value Removed", counter);
    setCounter (counter-1);
  }

  return (
    <>
      <h2>Chai aur React</h2>
      <h3>Initial value = 5</h3>
      <button
      onClick={addValue}
      >Add Value</button>
      <br />
      <button
      onClick={removeValue}
      >Remove Value</button>
      <h3>Current Value: {counter}</h3>
    </>
  )
}

export default App