import { useState, useEffect } from "react";

export default function Home() {

    const [arr, setArr] = useState([]);

    useEffect(() => {
        getAllUsers()
    }, [])

    function getAllUsers() {
        fetch("http://localhost:8080/", {
            headers: {
                // 'Authorization': 'Bearer ' + jwt,
            },
        })
            .then(res => res.json())
            .then(data => setArr(data))
    }

    return (
        <div className="container">
            <h1>Welcome</h1>
            <div>
                {arr.map((item) => (
                    <ul key={item.id}>
                        <li>{item.username}</li>
                    </ul>
                ))}
            </div>
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXF4cmQ0cnl2dDNkaHRsbnFjdWg4N3J6Y3ozMjA5dnA4MDNiYmp5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TitLQY80vZgrK/giphy.gif" alt="dancing-rat-placeholder" />
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXF4cmQ0cnl2dDNkaHRsbnFjdWg4N3J6Y3ozMjA5dnA4MDNiYmp5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TitLQY80vZgrK/giphy.gif" alt="dancing-rat-placeholder" />
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXF4cmQ0cnl2dDNkaHRsbnFjdWg4N3J6Y3ozMjA5dnA4MDNiYmp5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TitLQY80vZgrK/giphy.gif" alt="dancing-rat-placeholder" />
        </div>
    );
}