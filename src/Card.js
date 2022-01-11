import defaultPicture from "./mtg-card-default.jpg"

const Card = ({ card }) => {
    const img = card.imageUrl || defaultPicture ;
    console.log(card.imageUrl);
    console.log(img);
    return (
        <div>
        <img src={img} alt="artwork"></img>
            <h1>{card.name}</h1>
            <p>{card.text}</p>
        </div>
    )
}

export default Card;