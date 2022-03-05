import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultPicture from "./img/card-background.jpeg";
import { ReactComponent as White} from "./img/mtg-white.svg";
import { ReactComponent as Green } from "./img/mtg-green.svg";
import { ReactComponent as Blue } from "./img/mtg-blue.svg";
import { ReactComponent as Black } from "./img/mtg-black.svg";
import { ReactComponent as Red } from "./img/mtg-red.svg";

const Details = () => {
	const { id } = useParams();
	const [card, setCard] = useState({});
	const [picture, setPicture] = useState(defaultPicture);
	const [state, setState] = useState("notLoaded");

	useEffect(() => {
		console.log("https://api.magicthegathering.io/v1/cards/" + id);
		fetch("https://api.magicthegathering.io/v1/cards/" + id)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCard(data.card);
				setPicture(card.imageUrl);
				setState("loaded");
			});
	}, []);

	const insertMana = (str) => {
		str = str.replace(/{/g, "");
		str = str.replace(/}/g, "");
		const manaCost = str.split(""); 
		return(

			manaCost.map((mana, i) => {
				switch(mana) {
					case "W": 
						return <White key={i} alt="w" className="fill-white m-1" width="40pt" height="40pt" fill="blue"/>;
					case "B": 
						return <Black key={i} alt="w" className="fill-black m-1" width="40pt" height="40pt"/>;
					case "R": 
						return <Red key={i} alt="w" className="fill-red-800 m-1" width="40pt" height="40pt"/>;
					case "U": 
						return <Blue key={i} alt="w" className="fill-blue-600 m-1" width="40pt" height="40pt"/>;
					case "G": 
						return <Green key={i} alt="w" className="fill-green-900 m-1" width="40pt" height="40pt"/>;
					default: 
					 return <p key={i} className="text-xl m-1">{mana}</p>
				}
	
			})
		)
	
			
	}

	return (
		state === "loaded" && (
			<div className="p-t-9 px-9">
				<div className="flex justify-center m-4">
					<img className="rounded-xl shadow-xl" src={picture} alt="card"></img>
				</div>
				<div className="text-center">
					<p className="p-4 text-3xl">{card.name}</p>
					<div className="flex flex-row justify-center">
						{insertMana(card.manaCost)}
					</div>
				</div>
				<div className="text-center rounded-2xl shadow-lg ">
					<div>
						<ul className="flex flex-row ">
							<li className="cursor-pointer px-6 py-2 self-end rounded-t-lg bg-darkPurple">
								Text
							</li>
							<li className="cursor-pointer px-6 py-2 self-end rounded-t-lg">
								Legalities
							</li>
						</ul>
					</div>
					<div className="p-4 flex justify-center rounded-tr-2xl rounded-b-2xl bg-gradient-to-t from-blueishGreen to-darkPurple">
						<p>{card.text}</p>
						{/* <table className="w-full">
		<thead>
		<th className="border-2 p-5 text-xl">Format</th>
		<th className="border-2 p-5 text-xl">Legality</th>
		</thead>
		<tr>
		<td className="border-2 p-5 text-xl">Format</td>
		<td className="border-2 p-5 text-xl">Legality</td>
		</tr>
	</table> */}
					</div>
				</div>
			</div>
		)
	);
}

export default Details;