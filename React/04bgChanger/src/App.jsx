import { useState } from "react"


function App() {
  const [color, setColor] = useState("olive");

  return (
    <>
      <div className="w-full h-screen duration-200 " style={{backgroundColor: "olive"}}>

        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 ">
          <div className="flex flex-wrap bg-white px-3 py-2 justify-center gap-3 shadow-lg rounded-2xl"></div>
        </div>
      </div>
    </>
  )
}

export default App
