

export default function Card({ pet }) {
    return (
        <div>
            <h2>{pet.name}</h2>
            <h2>{pet.breeds.primary}</h2>
            <h2>{pet.age}</h2>
            <h2><a href={pet.url} target="_blank">🔗</a></h2>
            <img className="pet-photo" src={pet.photos[0].medium} alt="pet photo" />
        </div>
    );
}