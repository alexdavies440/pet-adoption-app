import { NavLink, Link } from "react-router";

export default function Header({ authenticated, setAuthenticated }) {

    function handleLogout() {
        fetch("http://localhost:8080/logout", {
            credentials: "include",
            method: 'POST'
        })
            .then(res => res.text())
            .then(data => console.log(data))
            .then(setAuthenticated(false))
            .catch(error => console.log(error))
    }

    return (
        <header className="navbar">
            <nav>
                <NavLink className="nav-item" to="/">Home</NavLink>

                {authenticated === true &&
                    <NavLink className="nav-item" to="/profile">Profile</NavLink>
                }

                {authenticated === false &&
                    <NavLink className="nav-item" to="/login">Login</NavLink>
                }

                {authenticated === true &&
                    <NavLink className="nav-item" to="/login" onClick={handleLogout}>Logout</NavLink>
                }

            </nav>
        </header>

    );
}