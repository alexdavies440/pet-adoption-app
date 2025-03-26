import { useState, useEffect } from "react";
import PetContent from "./PetContent";
import { apiKey, secret } from "../../../../sensitive/pet-adoption-app/keys.js"

export default function Home() {

    const [token, setToken] = useState("");

    useEffect(() => {
        generateBearerToken();
    },[])

    function generateBearerToken() {

        fetch("https://api.petfinder.com/v2/oauth2/token", {
            method: 'POST',
            body: new URLSearchParams({
                "grant_type": "client_credentials",
                "client_id": apiKey,
                "client_secret": secret
            })
        })
        .then(res => res.json())
        .then(data => setToken(data.access_token))
    }

    return (
        <div>
            <PetContent token={token} />
        </div>
    );
}