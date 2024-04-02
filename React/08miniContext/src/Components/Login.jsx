import { useContext, useState } from "react";
import React, {userState} from "react";
import UserContext from "../context/UserContext";

function Login () {

    const [username, setusernam] = useState('');
    const [password, setPassword] = useState('');

    const [setUser] = useContext(UserContext);

    const handleSubmit = () => {}

    return (
        <div>
        <h2>Login</h2>
        <input type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value) }
        placeholder='username'  />
        {" "}
        <input type='text' 
        value={password}
        onChange={(e) => setPassword(e.target.value) }
        placeholder='password'  />
        <button onClick={handleSubmit}>Submit</button>
    </div>
    );
}

export default Login;
