import defaultPicture from "./img/card-background.jpeg";
import "./style/card.css";
import { useState } from "react";
import { Link } from "react-router-dom";


const Card = ({ card }) => {
    const img = card.imageUrl || defaultPicture ;
    const [hovered, setHovered] = useState(false);
    console.log(card.imageUrl);
    console.log(img);

   

    return (
			<Link to={card.id}>
				<div
					className="my-10 shadow-xl"
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<div className="card-picture">
						<img className="card-img" src={img} alt="artwork"></img>
						{(img === defaultPicture || hovered) && (
							<div className="overlay-text">
								<div>
									<h1>{card.name}</h1>
									<p>{card.manaCost}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</Link>
		);
}

export default Card;