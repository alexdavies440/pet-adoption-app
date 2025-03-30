import { useState, useEffect } from "react";
import Card from "./Card";


export default function PetContent({ token, type }) {

    const [pets, setPets] = useState([]);
    // const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        getAllPets();
    }, [token, type])

    function getAllPets() {
        const dogUrl = `https://api.petfinder.com/v2/animals?type=${type}`;

        // setIsLoading(true);

        fetch(dogUrl, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setPets(data.animals))
            // .then(setIsLoading(false));
    }

    return (
        <div>
            {/* {isLoading && <h1>Loading...</h1>} */}
            {pets.map((pet) => (
                pet.photos[0] &&
                <div key={pet.id} className="card"> 
                    {pet.photos[0] && <img className="pet-photo" src={pet.photos[0].large} alt="pet photo" />}
                    <h2>{pet.name}</h2>
                    <h2><a href={pet.url} target="_blank">🔗</a></h2>  
                </div>
            ))}
        </div>
    );
}