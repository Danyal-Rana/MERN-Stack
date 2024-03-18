import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let counter = 15;

  const addValue = () => {
    console.log ("Value Added", Math.random());
  }

  return (
    <>
      <h2>Chai aur React</h2>
      <h3>Counter value = 5</h3>
      <button
      onClick={addValue}
      >Add Value</button>
      <br />
      <button>Remove Value</button>
    </>
  )
}

export default App