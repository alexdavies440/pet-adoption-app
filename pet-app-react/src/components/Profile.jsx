import { useState, useEffect } from "react";

export default function Profile({ jwt }) {

    const [username, setUsername] = useState("");

    useEffect(() => {
        getPrincipal()
    }, [])

    function getPrincipal() {
        fetch("http://localhost:8080/principal", {
            headers: {
                'Authorization': 'Bearer ' + jwt,
            },
        })
            .then(res => res.text())
            .then(data => setUsername(data))
    }
    return (
        <h1 className="container">Welcome {username.toUpperCase()}</h1>
    );
}