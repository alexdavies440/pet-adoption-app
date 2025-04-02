import { useState, useEffect } from "react";
import Card from "./Card";


export default function PetContent({ token }) {

    const [pets, setPets] = useState([]);
    const [type, setType] = useState("");
    const [breedData, setBreedData] = useState([]);
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
        if (location === undefined ||
            distance === undefined ||
            location === "" ||
            distance === "") {
            url = `https://api.petfinder.com/v2/animals?type=${type}&breed=${breed}&limit=50`;
        }
        else {
            url = `https://api.petfinder.com/v2/animals?type=${type}&location=${location}&distance=${distance}&breed=${breed}&limit=50`;
        }
        // setIsLoading(true);

        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setPets(data.animals));

        // .then(setIsLoading(false));
    }

    function getBreeds(input) {
        let url = `https://api.petfinder.com/v2/types/${input}/breeds`;
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setBreedData(data.breeds));
    }

    function handleTypeChange(event) {
        setType(event.target.value);
        event.target.value === "" ? setBreedData([]) : getBreeds(event.target.value);
    }

    function handleBreedChange(event) {
        setBreed(event.target.value);
    }

    function handleSearch(event) {

        // Need error handling for invalid inputs to prevent crash 
        
        event.preventDefault();
        if (distance <= 100 || distance === undefined || distance === "") {
            getAllPets();
        }

        // console.log(type);
    }

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <h2>Filter Results</h2>

                <div>
                    <label className="form-item" htmlFor="type">Creature</label>
                    <select className="pet-type" name="type" id="type" value={type} onChange={handleTypeChange}>
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
                    <label className="form-item" htmlFor="breed">Breed</label>
                    <select className="pet-breed" name="breed" id="breed" value={breed} onChange={handleBreedChange}>
                        <option value="">Show All</option>
                        {breedData.map((breed, index) => (
                            <option key={index} value={breed.name}>{breed.name}</option>
                        ))}
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

                <button id="update-results-button" type="submit">Update</button>
            </form>

            <div className="card-collection">
                {
                    pets.length === 0 &&
                    <h1 className="no-results-message">No Results</h1>
                }
                {
                    pets.length > 1 &&
                    pets.map((pet) => (
                        <div key={pet.id}>
                            <Card pet={pet} />
                        </div>
                    ))}
            </div>
        </div>
    );
}