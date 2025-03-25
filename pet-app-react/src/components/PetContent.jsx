import { useState, useEffect } from "react";
import Card from "./Card";


export default function PetContent({ token }) {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        console.log(token)
        getAllPets();
    }, [token])


    async function getAllPets() {
        const dogUrl = "https://api.petfinder.com/v2/animals?type=dog&page=1";
        await fetch(dogUrl, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setPets(data.animals))
    }


    return (
        <div>
            {pets.map((pet) => (
                // Only show pets with photos
                pet.photos[0] &&
                <div key={pet.id} className="card">
                    <h2>{pet.name}</h2>
                    <h2>{pet.breeds.primary}</h2>
                    <h2>{pet.age}</h2>
                    <h2><a href={pet.url} target="_blank">🔗</a></h2>
                    <img className="pet-photo" src={pet.photos[0].medium} alt="pet photo" />
                </div>
            ))}
        </div>
    );
}