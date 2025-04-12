import { useState } from "react";

export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
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
                "email": email,
                "password": password,
                "verifyPassword": verifyPassword
            })
        })
            .then(res => res.text())
            .then(data => setError(data))
            .then(setUsername(""))
            .then(setEmail(""))
            .then(setPassword(""))
            .then(setVerifyPassword(""))
            // .catch(error => console.log(error))

    }
    if (error === "") {
        // Need logic to redirect to login page if registration is successful
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
                    <label className="form-item" htmlFor="email">Email: </label>
                    <input type="email" name="email" value={email} onChange={handleEmailChange} />
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
            <h3>{error}</h3>
        </div>
    );
}