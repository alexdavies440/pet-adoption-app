

export default function Card({ pet }) {

    function handleNullPhoto(photo) {
        if (photo === null) {
            return "https://t3.ftcdn.net/jpg/05/34/21/24/360_F_534212408_moxhV1d5Xj0TJiUDbnJvZmZrxmdDXH71.jpg"
        }
        else {
            return photo.full;
        }
    }

    return (
        <a href={pet.url} target="_blank">
            <div key={pet.id} className="card">
                <h4 className="pet-name">{pet.name}</h4>
                <img className="pet-photo" src={handleNullPhoto(pet.primary_photo_cropped)} alt="pet photo" />
                {/* <h4>{pet.type}</h4> */}
            </div>
        </a>
    );
}