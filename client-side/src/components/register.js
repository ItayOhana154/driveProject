import React, { useState} from 'react';
import { useUser } from '../contexts/userContext';
import { Link, useNavigate } from 'react-router-dom';
// import Main from './components/main';

function Register() {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({ username: "", password: "" })
    const {user, setUser}= useUser()
    function handleChange(event) {
        const obj = { ...inputValues };
        obj[event.target.name] = event.target.value;
        setInputValues(obj);
    }

    async function moveMe(e) {
        e.preventDefault();
    
        const res = await fetch(`http://localhost:8000/api/users`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(inputValues)
        })
        const currentUser = await res.json();
        console.log(currentUser);
        if (currentUser.name) {
            alert("bad");
            setUser(currentUser.name);
            navigate(`/`)
        }
        else {
            alert("rtrt");
        }
    }


    return (
        <div className="App">
            <form  onSubmit={moveMe}>
                <label>username</label>
                <input type="text" name="username" value={inputValues.username} onChange={(e) => handleChange(e)} /><br />
                <label>password</label>
                <input type="text" name="password" value={inputValues.password} onChange={(e) => handleChange(e)} /><br />
                <input type="submit" />
            </form>
            <Link to="/">login</Link>
        </div>
    );
}

export default Register;
