import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Profile({ authenticated }) {

    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const placeholderArr = ["Aldo", "Looney", "Effy", "Lucy"];

    useEffect(() => {
        authenticate()
    }, [])

    function authenticate() {
        if (authenticated) {
            getPrincipal();
        }
        else {
            navigate("/login");
        }
    }

    function getPrincipal() {
        fetch("http://localhost:8080/principal", {
            credentials: "include"
        })
            .then(res => res.text())
            .then(data => setUsername(data))
    }

    return (
        <div className="profile">

            <div>
                <h1 className="profile-header">{username.toUpperCase()}</h1>
            </div>
            <div>
                <h2>Saved Pets</h2>
                <ul>
                    {placeholderArr.map((name, index) => (
                        <a href="#">
                            <li key={index}>
                                {name}
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    );
}