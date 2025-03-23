import { useState, useEffect } from "react";

export default function Home() {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        // getAllPets()
    }, [])

    function getAllPets() {
        fetch();
    }

    return (
        <div className="container">
            <h1>Welcome</h1>
          
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXF4cmQ0cnl2dDNkaHRsbnFjdWg4N3J6Y3ozMjA5dnA4MDNiYmp5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TitLQY80vZgrK/giphy.gif" alt="dancing-rat-placeholder" />
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXF4cmQ0cnl2dDNkaHRsbnFjdWg4N3J6Y3ozMjA5dnA4MDNiYmp5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TitLQY80vZgrK/giphy.gif" alt="dancing-rat-placeholder" />
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXF4cmQ0cnl2dDNkaHRsbnFjdWg4N3J6Y3ozMjA5dnA4MDNiYmp5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TitLQY80vZgrK/giphy.gif" alt="dancing-rat-placeholder" />
        </div>
    );
}