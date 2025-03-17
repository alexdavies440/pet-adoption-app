import { NavLink, Link } from "react-router";

export default function Header({ jwt }) {
    return (
        <header className="navbar">
            <nav>
                <NavLink className="nav-item" to="/">Home</NavLink>
                <NavLink className="nav-item" to="/login">Login</NavLink>
                <NavLink className="nav-item" to="/register" >Register</NavLink>
                {jwt !== "" && 
                <NavLink className="nav-item" to="/profile">Profile</NavLink>
                }
            </nav>
        </header>

    );
}