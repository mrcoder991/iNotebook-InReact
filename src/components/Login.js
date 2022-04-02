import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate  } from 'react-router-dom';

export const Login = () => {
    const context = useContext(noteContext);
    const { login } = context;
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     login({email: credentials.email, password: credentials.password})
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate('/');

        }
        else{
            alert("Invalid credentials");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" value={credentials.password} name="password" id="password"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
