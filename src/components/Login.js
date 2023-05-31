import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: userData.email, password: userData.password })
        });
        const data = await response.json();
        if (response.status === 404) {
            alert(data.message);
            navigate("/signup");
        }
        else if (response.status === 401) {
            alert(data.message);
        }
        else {
            localStorage.setItem("token", data.jwtToken);
            navigate("/");
        }
    }

    return (
        <div className="container">
            <form method='post' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter your email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={userData.email} name='email' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter your password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={userData.password} name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
