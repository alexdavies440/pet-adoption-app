import { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [arr, setArr] = useState([]);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8080/login";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        })
        .then(
            fetch("http://localhost:8080/all-users")
            .then(res => res.json())
            .then(data => console.log(data))
        )
    }

    return (
        <form action="/login" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username"></label>
                <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
            </div>

            <div>
                <label htmlFor="password"></label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>

            <button type="submit">Login</button>
        </form>
    );
}