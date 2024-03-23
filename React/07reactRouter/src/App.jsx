import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/footer/Footer'
import Home from './components/home/home'
import Header from './components/header/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Footer />
      <Home />
    </>
  )
}

export default App
