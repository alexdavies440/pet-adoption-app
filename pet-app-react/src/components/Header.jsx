import { NavLink, Link } from "react-router";

export default function Header() {

    function handleLogout() {
        fetch("http://localhost:8080/logout", {
            method: 'POST'
        })
            .then(res => res.text())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

return (
    <header className="navbar">
        <nav>
            <NavLink className="nav-item" to="/">Home</NavLink>

            <NavLink className="nav-item" to="/profile">Profile</NavLink>

            <NavLink className="nav-item" to="/login">Login</NavLink>

            <NavLink className="nav-item" to="/login" onClick={handleLogout}>Logout</NavLink>

        </nav>
    </header>

);
}