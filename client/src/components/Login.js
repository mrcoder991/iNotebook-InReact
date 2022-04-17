import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';

export const Login = (props) => {

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
        const response = await fetch(`${process.env.PORT}/api/auth/login`, {
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
            props.showAlert("Successfully logged in", "success");
        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login to continue to iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" value={credentials.password} name="password" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <p>New to iNotebook? <Link to="/signup">Signup</Link></p>
            </form>
        </div>
    )
}
