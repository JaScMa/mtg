import defaultPicture from "./img/card-background.jpeg";
import "./style/card.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as White} from "./img/mtg-white.svg";
import { ReactComponent as Green } from "./img/mtg-green.svg";
import { ReactComponent as Blue } from "./img/mtg-blue.svg";
import { ReactComponent as Black } from "./img/mtg-black.svg";
import { ReactComponent as Red } from "./img/mtg-red.svg";



const Card = ({ card }) => {
    const img = card.imageUrl || defaultPicture ;
    const [hovered, setHovered] = useState(false);


	

	const insertMana = (str) => {
		str = str.replace(/{/g, "");
		str = str.replace(/}/g, "");
		const manaCost = str.split(""); 
		return(

			manaCost.map((mana, i) => {
				switch(mana) {
					case "W": 
						return <White key={i} alt="white" className="fill-white m-1" width="20pt" height="20pt" fill="blue"/>;
					case "B": 
						return <Black key={i} alt="black" className="fill-black m-1" width="20pt" height="20pt"/>;
					case "R": 
						return <Red key={i} alt="red" className="fill-red-800 m-1" width="20pt" height="20pt"/>;
					case "U": 
						return <Blue key={i} alt="blue" className="fill-blue-600 m-1" width="20pt" height="20pt"/>;
					case "G": 
						return <Green key={i} alt="green" className="fill-green-900 m-1" width="20pt" height="20pt"/>;
					default: 
					 return <p key={i} className="text-xl m-1">{mana}</p>
				}
	
			})
		)
	
			
	}
   

    return (
			<Link to={"/Details/" + card.id}>
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
									<div className=" flex flex-row justify-center">
										{(!card.manaCost) ? "" : insertMana(card.manaCost)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</Link>
		);
}

export default Card;