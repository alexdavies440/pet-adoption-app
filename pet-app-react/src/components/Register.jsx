import { useState } from "react";

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleVerifyPasswordChange(event) {
        setVerifyPassword(event.target.value)
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
                "verifyPassword": verifyPassword
            })
        })
            .then(res => res.text())
            .then(data => console.log(data))
            .then(setUsername(""))
            .then(setPassword(""))
            .then(setVerifyPassword(""))
            .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h1>Join Us!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-item" htmlFor="username">Username: </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label className="form-item" htmlFor="password">Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div>
                    <label className="form-item" htmlFor="verifyPassword">Verify Password: </label>
                    <input type="password" name="verifyPassword" value={verifyPassword} onChange={handleVerifyPasswordChange} />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}