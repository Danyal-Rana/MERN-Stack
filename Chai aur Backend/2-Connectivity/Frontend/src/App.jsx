import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([]); // This is a hook

  useEffect ( () => {
    // axios.get('https://localhost:5000/api/jokes') this is long, so adapting another way 
    axios.get('/api/jokes') // here comes the concept of CROS and Proxy (vite.config.js)
    .then ((response) => {
      setJokes(response.data);
    })
    .catch ((error) => {
      console.log(error);
    })
  }, [] )

  return (
    <>
      <h1>Chai aur Full Stack</h1>
      <p>Total Jokes: {jokes.length}</p>

      {
        jokes.map( (joke, index) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
