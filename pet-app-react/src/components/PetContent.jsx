import { useState, useEffect } from "react";
import Card from "./Card";


export default function PetContent({ token }) {

    const [pets, setPets] = useState([]);
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [location, setLocation] = useState();
    const [distance, setDistance] = useState();
    // const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        getAllPets();
        // getTypes();
    }, [token])

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

    function getTypes() {
        let url = "https://api.petfinder.com/v2/types?";
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    function handleSearch(event) {
        event.preventDefault();
        getAllPets();
        console.log(type);
    }

    // console.log(pets)

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <h2>Filter Results</h2>

                <div>
                    <label className="form-item" htmlFor="type">Creature</label>
                    <select className="pet-type" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Show All </option>
                        <option value="cat">Cats 🐈‍⬛</option>
                        <option value="dog">Dogs 🐕</option>
                        <option value="rabbit">Rabbits 🐇</option>
                        <option value="bird">Birds 🦢</option>
                        <option value="horse">Horses 🐎</option>
                        <option value="small-furry">Rodent 🐁</option>
                        <option value="barnyard">Livestock 🐄</option>
                        <option value="scales-fins-other">Misc 🐢</option>
                    </select>
                </div>

                <div>
                    <label className="form-item" htmlFor="location">Zip Code</label>
                    <input type="number" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
        
                <div>
                    <label className="form-item" htmlFor="distance">Distance (miles)</label>
                    <input type="number" name="distance" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} />
                </div>

                <button type="submit">Update</button>
            </form>

            <div className="card-collection">
                {pets.map((pet) => (
                    <div key={pet.id}>
                        <Card pet={pet} />
                    </div>
                ))}
            </div>
        </div>
    );
}