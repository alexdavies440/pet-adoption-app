

export default function Card({ pet }) {

    function handleNullPhoto(photo) {
        if (photo === null) {
            return "/src/assets/pet-placeholder-img.jpg"
        }
        else {
            return photo.full;
        }
    }

    return (
        <a href={pet.url} target="_blank">
            <div className="card">
                <img className="pet-photo" src={handleNullPhoto(pet.primary_photo_cropped)} alt={`Pet photo for a ${pet.type} named ${pet.name}`} />
                <h4 className="pet-name">{pet.name}</h4>
            </div>
        </a>
    );
}