import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';

export const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" });
    const navigate = useNavigate();
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    // Save the auth token and redirect
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert("Account Created Successfully", "success");
    }
    else {
      props.showAlert("Invalid credentials", "danger");
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create a secured account with iNotebook</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input onChange={onChange} type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={onChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={onChange} type="password" className="form-control"name="password" id="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
          <input  onChange={onChange}type="password" className="form-control" name="cpassword" id="confirmpassword" minLength={5} required/>
        </div>
        <div className="mb-3 form-check">
          <input onChange={onChange} type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
