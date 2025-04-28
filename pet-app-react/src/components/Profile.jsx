import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Profile({ authenticated, token }) {

    const [username, setUsername] = useState("");
    const [followed, setFollowed] = useState([]);
    const [followedData, setFollowedData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        authenticate();
        getFollowedPets();
        getFollowedData();
    }, [token, followed.length])

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

    function getFollowedPets() {
        fetch("http://localhost:8080/following", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setFollowed(data))
    }

    function getFollowedData() {

        for (let i = 0; i < followed.length; i++) {
            // For each item in followed, fetch that pet data using petId and spread to followedData to be mapped
            let petId = followed[i];
            fetch(`https://api.petfinder.com/v2/animals/${petId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data =>
                    setFollowedData(
                        fd => [...fd, data.animal]
                    ))
        }
    }

    function handleNullPhoto(photo) {
        if (photo === null) {
            return "/src/assets/pet-placeholder-img.jpg"
        }
        else {
            return photo.small;
        }
    }

    function unFollowPet(pet) {
        fetch("http://localhost:8080/unfollow", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: pet.id
        })
            .then(res => res.text())
            .then(data => console.log(data));
    }


    return (
        <div className="profile">

            <div>
                <h1 className="profile-header">{username.toUpperCase()}</h1>
            </div>
            <div>
                <h2>Following</h2>
                {followedData.length !== followed.length &&
                    <h3>Loading...</h3>
                }
                {followed.length === 0 &&
                    <h3>You are not following any pets</h3>
                }
                <ul>
                    {followedData.length === followed.length && followedData.map((pet) => (
                        <a href={pet.url} target="_blank">
                            <li key={pet.id}>
                                {pet.name} - <button onClick={unFollowPet(pet)}>Remove</button>
                                <br />
                                <img className="pet-photo" src={handleNullPhoto(pet.primary_photo_cropped)} alt="pet photo" />
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    );
}