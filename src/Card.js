import defaultPicture from "./img/card-background.jpeg";
import "./style/card.css";
import { useState } from "react";


const Card = ({ card }) => {
    const img = card.imageUrl || defaultPicture ;
    const [hovered, setHovered] = useState(false);
    console.log(card.imageUrl);
    console.log(img);

   

    return (
        <div className="my-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave ={() => setHovered(false)}
        >
            <div className="card-picture">
                <img className="card-img" src={img} alt="artwork">
                    
                </img>
                { (img === defaultPicture || hovered) &&
                    <div className="overlay-text">
                        <div className="overlay">

                        <h1>{card.name}</h1>
                        <p>{card.text}</p>
                        </div>
                    </div> 
                }
        
            </div>

        </div>
    )
}

export default Card;