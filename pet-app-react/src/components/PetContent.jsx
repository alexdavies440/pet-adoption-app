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

    function handleNullPhoto(photo) {
        if (photo === null) {
            return "https://t3.ftcdn.net/jpg/05/34/21/24/360_F_534212408_moxhV1d5Xj0TJiUDbnJvZmZrxmdDXH71.jpg"
        }
        else {
            return photo.full;
        }
    }

    console.log(pets)

    return (
        <div>
            {/* {isLoading && <h1>Loading...</h1>} */}
            {pets.map((pet) => (
                // pet.photos[0] &&
                <a href={pet.url} target="_blank">
                    <div key={pet.id} className="card">
                        <img className="pet-photo" src={handleNullPhoto(pet.primary_photo_cropped)} alt="pet photo" />
                        <h4>{pet.name}</h4>
                        {/* <h4>{pet.type}</h4> */}
                    </div>
                </a>
            ))}
        </div>
    );
}