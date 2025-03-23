import { NavLink, Link } from "react-router";

export default function Header({ credentials, setCredentials }) {

    function handleLogout() {
        fetch("http://localhost:8080/logout", {
            credentials: "include",
            method: 'POST'
        })
            .then(setCredentials("omit"))
            .then(res => res.text())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    return (
        <header className="navbar">
            <nav>
                <NavLink className="nav-item" to="/">Home</NavLink>

                {credentials === "include" &&
                    <NavLink className="nav-item" to="/profile">Profile</NavLink>
                }

                {credentials !== "include" &&
                    <NavLink className="nav-item" to="/login">Login</NavLink>
                }
                {credentials === "include" &&
                    <NavLink className="nav-item" to="/login" onClick={handleLogout}>Logout</NavLink>
                }

            </nav>
        </header>

    );
}