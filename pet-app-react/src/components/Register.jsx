import { useState } from "react";

export default function Register() {

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

        fetch("http://localhost:8080/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username"></label>
                <input type="text" name="username" value={username} onChange={handleUsernameChange} />
            </div>

            <div>
                <label htmlFor="password"></label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange} />
            </div>

            <button type="submit">Register</button>
        </form>
    );
}