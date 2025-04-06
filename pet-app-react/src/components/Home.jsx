import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import PetContent from "./PetContent.jsx";
import { apiKey, secret } from "../../../../sensitive/pet-adoption-app/keys.js";

export default function Home({ token, authenticated }) {

    return (
        <div>
            <PetContent
                token={token} 
                type="" 
                authenticated={authenticated}
            />
        </div>
    );
}