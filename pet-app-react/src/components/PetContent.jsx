import { useState, useEffect } from "react";
import Card from "./Card";


export default function PetContent({ token, type, location, distance }) {

    const [pets, setPets] = useState([]);
    // const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        getAllPets();
    }, [token, type])

    function getAllPets() {
        let url = `https://api.petfinder.com/v2/animals?type=${type}`;
        if (location === undefined || distance === undefined) {
            url = `https://api.petfinder.com/v2/animals?type=${type}`;
        }
        else {
            url = `https://api.petfinder.com/v2/animals?type=${type}&location=${location}&distance=${distance}`;
        }
        // setIsLoading(true);

        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setPets(data.animals))
        // .then(setIsLoading(false));
    }

    // console.log(pets)

    return (
        <div className="card-collection">
            {/* {isLoading && <h1>Loading...</h1>} */}
            {pets.map((pet) => (
                <div key={pet.id}>
                    <Card pet={pet} />
                </div>
            ))}
        </div>
    );
}