import defaultPicture from "./img/card-background.jpeg"
import "./style/card.css"

const Card = ({ card }) => {
    const img = card.imageUrl || defaultPicture ;
    console.log(card.imageUrl);
    console.log(img);

   

    return (
        <div className="card">
            <div className="card-picture">
                <img className="card-img" src={img} alt="artwork"></img>
                { (img === defaultPicture) &&
                    <div className="test">
                        <h1>{card.name}</h1>
                        <p>{card.text}</p>
                    </div> 
                }
        
            </div>
            {/* <div className="card-text"> 
                <h1>{card.name}</h1>
                <p>{card.text}</p>
            </div> */}
        </div>
    )
}

export default Card;