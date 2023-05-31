import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.cpassword) {
            alert("Passwords are not matching");
            return;
        }
        const response = await fetch("http://localhost:/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password
            })
        })

        const data = await response.json();
        if (response.status === 409) {
            alert(data.message);
            navigate("/login");
        }
        else if (response.status === 201) {
            alert("Account created successfully. Please login to continue");
            navigate("/login");
        }
        else {
            alert("Internal error occured, try after some time!");
        }
    }
    return (
        <div className="container">
            <form method='post' onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter your name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} value={userData.name} name='name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter your email</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={userData.email} name='email' />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Enter your phone</label>
                    <input type="number" className="form-control" id="phone" onChange={onChange} value={userData.phone} name='phone' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter your password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={userData.password} name='password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm your password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} value={userData.cpassword} name='cpassword' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
