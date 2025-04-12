import { useState } from "react";

export default function Card({ pet, authenticated }) {

    const [isVisible, setIsVisible] = useState(false);

    function handleNullPhoto(photo) {
        if (photo === null) {
            return "/src/assets/pet-placeholder-img.jpg"
        }
        else {
            return photo.full;
        }
    }

    function handleFollow() {

        fetch("http://localhost:8080/follow", {
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
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {authenticated &&
                <button
                    className={isVisible ? "follow-button mouseOver" : "follow-button"}
                    onClick={handleFollow}
                >Follow
                </button>
            }
             
            <a href={pet.url} target="_blank" >
                <div className="card">
                    <img className="pet-photo" src={handleNullPhoto(pet.primary_photo_cropped)} alt={`Pet photo for a ${pet.type} named ${pet.name}`} />
                    <h4 className="pet-name">{pet.name} {pet.distance && ` - ${Math.round(pet.distance)}mi`}</h4>
                </div>
            </a>
        </div>

    );
}