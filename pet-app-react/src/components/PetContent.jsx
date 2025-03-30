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

    // console.log(pets)

    return (
        <div className="card-collection">
            {/* {isLoading && <h1>Loading...</h1>} */}
            {pets.map((pet) => (
                <Card pet={pet} />
            ))}
        </div>
    );
}