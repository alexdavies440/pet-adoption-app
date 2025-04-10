import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Profile({ authenticated, token, followed }) {

    const [username, setUsername] = useState("");
    const [followedData, setFollowedData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        authenticate();
        getPetData();
    }, [token, followed])

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

    function getPetData() {
        for (let i = 0; i < followed.length; i++) {
            let petId = followed[i];
            fetch(`https://api.petfinder.com/v2/animals/${petId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => setFollowedData(
                fd => [...fd, data.animal]
            ))
            .then(console.log(followedData))
        }
    }

    console.log(followed);
    console.log(followedData);

    return (
        <div className="profile">

            <div>
                <h1 className="profile-header">{username.toUpperCase()}</h1>
            </div>
            <div>
                <h2>Following</h2>
                {followed.length === 0 &&
                <h3>You are not following any pets</h3>
                }
                 <ul>
                    {followedData.map((pet) => (
                        <a href={pet.url} target="_blank">
                            <li key={pet.id}>
                                {pet.name}
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    );
}