import { NavLink, Link } from "react-router";

export default function Header() {
    return (
        <div>
            <nav className="navbar">
                <NavLink  className="nav-item" to="/">Home</NavLink>
                <NavLink className="nav-item" to="/login">Login</NavLink>
                <NavLink className="nav-item" to="/register" >Register</NavLink>
            </nav>
        </div>

    );
}