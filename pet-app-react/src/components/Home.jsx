import PetContent from "./PetContent.jsx";

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