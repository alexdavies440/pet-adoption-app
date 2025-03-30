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
                <div id="content-nav-items">
                    <NavLink className="nav-item" to="/">Home</NavLink>

                    <NavLink className="nav-item" to="/cats">Cats</NavLink>
                    <NavLink className="nav-item" to="/dogs">Dogs</NavLink>
                    <NavLink className="nav-item" to="/rabbits">Rabbits</NavLink>
                    <NavLink className="nav-item" to="/birds">Birds</NavLink>
                    <NavLink className="nav-item" to="/horses">Horses</NavLink>
                    <NavLink className="nav-item" to="/misc">Misc Creature</NavLink>
                </div>

                <div id="account-nav-items">
                    {authenticated === true &&
                        <NavLink className="nav-item" to="/profile">Profile</NavLink>
                    }
                    {authenticated === false &&
                        <NavLink className="nav-item" to="/login">Login</NavLink>
                    }
                    {authenticated === true &&
                        <NavLink className="nav-item" to="/login" onClick={handleLogout}>Logout</NavLink>
                    }
                </div>
            </nav>

        </header>

    );
}