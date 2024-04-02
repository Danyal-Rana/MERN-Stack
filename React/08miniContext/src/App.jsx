import Profile from './Components/Profile'
import Login from './Components/Login'
import UserContextProvider from './context/UserContextProvider'


function App() {
  
  return (
    <UserContextProvider>
      <h1>React with Chai and Share important hai</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
