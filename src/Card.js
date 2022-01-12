import defaultPicture from "./mtg-card-default.jpg"
import "./style/card.css"

const Card = ({ card }) => {
    const img = card.imageUrl || defaultPicture ;
    console.log(card.imageUrl);
    console.log(img);
    return (
        <div class="card">
            <div class="card-picture">
                <img src={img} alt="artwork"></img>
            </div>
            <div class="card-text"> 
                <h1>{card.name}</h1>
                <p>{card.text}</p>
            </div>
        </div>
    )
}

export default Card;