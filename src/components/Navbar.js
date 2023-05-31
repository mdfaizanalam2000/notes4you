import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Notes4You</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {!localStorage.getItem("token") ?
                            <>
                                <Link className="btn btn-success mx-2" to="/login" role="button">Login</Link>
                                <Link className="btn btn-success" to="/signup" role="button">Signup</Link>
                            </> : <Link className="btn btn-success" to="/login" role="button" onClick={handleLogout}>Logout</Link>
                        }
                    </form>
                </div>
            </div>
        </nav>
    )
}
