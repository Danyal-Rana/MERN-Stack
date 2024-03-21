import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-green-500 p-4 text-black rounded-xl m-5">
        Welcome to Tailwind in React
      </h1>

      
      <Card username="Danyal" btnTxt="click me"/>
      <Card username="Rana" btnTxt="read me"/>

      
    </>
  );
}

export default App;
