import PetContent from "./PetContent.jsx";

export default function Home({ token, authenticated, setFollowed }) {

    return (
        <div>
            <PetContent
                token={token} 
                type="" 
                authenticated={authenticated}
                setFollowed={setFollowed}
            />
        </div>
    );
}