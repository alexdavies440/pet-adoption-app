import { useState } from "react";
import { NavLink, Link } from "react-router";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        })
            .then(res => res.text())
            .then(data => console.log(data))
            .then(setUsername(""))
            .then(setPassword(""))
            .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <label className="form-item" htmlFor="username">Username: </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label className="form-item" htmlFor="password">Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>

                <button type="submit">Login</button>
            </form>
            <Link className="link" to="/register">Register for an account</Link>
        </div>

    );
}