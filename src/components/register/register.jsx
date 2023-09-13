import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../api/api";
import './register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register() {
  const history = useNavigate();

  const signupform = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.password1.value,
    };

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (data.password.length < 6) {
      alert("Password should have at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}user-register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'username': data.username,
          'email': data.email,
          'password': data.password,
        })
      });

      if (response.status === 400) {
        alert("Registration failed. Please check your inputs.");
        return;
      }

      history('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <div className="maindiv">
      <div style={{ display: 'block', width: 500, padding: 30 }}>
        <h4>Register</h4>
        <Form onSubmit={(e) => signupform(e)}>
          <Form.Group className="py-2">
            <Form.Control type="text" name="username" placeholder="Username" required />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="email" name="email" placeholder="Email" required />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="password" name="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="password" name="password1" placeholder="Confirm Password" required />
          </Form.Group>
          <Button variant="primary" className="my-4" type="submit">
            Register
          </Button>
        </Form>
        <p className="text-center text-muted mt-4 mb-0">Already have an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link></p>
      </div>
    </div>
  )
}

export default Register;
