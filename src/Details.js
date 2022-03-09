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
	const [pic, setPic] = useState(defaultPicture);
	const [state, setState] = useState("loading");
	const [tab, setTab] = useState("text");


	useEffect(() => {
		fetch("https://api.magicthegathering.io/v1/cards/" + id)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCard(data.card);
				setState("loaded");
			});
		});
		
		useEffect(() => {
			let picture = card.imageUrl || defaultPicture;
			setPic(picture);
		},[card]);

	const insertMana = (str) => {
		str = str.replace(/{/g, "");
		str = str.replace(/}/g, "");
		const manaCost = str.split(""); 
		return(

			manaCost.map((mana, i) => {
				switch(mana) {
					case "W": 
						return <White key={i} alt="white" className="fill-white m-1" width="40pt" height="40pt" fill="blue"/>;
					case "B": 
						return <Black key={i} alt="black" className="fill-black m-1" width="40pt" height="40pt"/>;
					case "R": 
						return <Red key={i} alt="red" className="fill-red-800 m-1" width="40pt" height="40pt"/>;
					case "U": 
						return <Blue key={i} alt="blue" className="fill-blue-600 m-1" width="40pt" height="40pt"/>;
					case "G": 
						return <Green key={i} alt="green" className="fill-green-900 m-1" width="40pt" height="40pt"/>;
					default: 
					 return <p key={i} className="text-5xl m-1">{mana}</p>
				}
	
			})
		)
	
			
	}

	return (
		(state === "loaded") && (
			<div className="p-9">
				<div className="flex justify-center m-4">
					<img className="rounded-xl shadow-xl" src={pic} alt="card"></img>
				</div>
				<div className="text-center">
					<p className="p-4 text-3xl">{card.name}</p>
					<div className="flex flex-row justify-center">
						{insertMana(card.manaCost || "")}
					</div>
				</div>
				<div className="text-center rounded-2xl shadow-lg ">
					<div>
						<ul className="flex flex-row ">
							<li
								className={
									"cursor-pointer px-6 py-2 self-end rounded-t-lg " +
									(tab === "text" ? " bg-darkPurple" : "")
								}
								onClick={() => setTab("text")}
							>
								Text
							</li>
							{(card.legalities) && (<li
								className={
									"cursor-pointer px-6 py-2 self-end rounded-t-lg" +
									(tab === "legal" ? " bg-darkPurple" : "")
								}
								onClick={() => setTab("legal")}
							>
								Legalities
							</li>)}
							{(card.rulings) && (<li
								className={
									"cursor-pointer px-6 py-2 self-end rounded-t-lg" +
									(tab === "rule" ? " bg-darkPurple" : "")
								}
								onClick={() => setTab("rule")}
							>
								Rules
							</li>)}
						</ul>
					</div>
					<div
						className={
							"p-4 flex justify-center bg-gradient-to-t from-blueishGreen to-darkPurple " +
							(tab === "text" ? "rounded-tr-2xl rounded-b-2xl" : "rounded-2xl")
						}
					>
						{tab === "text" && <p className="text-xl py-8 px-14">{card.text}</p>}
						{tab === "legal" && (
							<table className="w-full mb-6">
								<thead>
									<tr>
										<th className="border-2 py-5 text-xl underline">Format</th>
										<th className="border-2 py-5 text-xl underline">Legality</th>
									</tr>
								</thead>
								{card.legalities.map((row, i) => (
									<tbody key={i}>
										<tr>
											<td className="border-2 py-5 text-xl">{row.format}</td>
											<td className="border-2 py-5 text-xl">{row.legality}</td>
										</tr>
									</tbody>
								))}
							</table>
						)}
						{tab === "rule" && (
							<table className="w-full">
								<thead>
									<tr>
										<th className="border-2 py-5 text-xl underline">Date</th>
										<th className="border-2 py-5 text-xl underline">Rule</th>
									</tr>
								</thead>
								{card.rulings.map((row, i) => (
									<tbody key={i}>
										<tr>
											<td className="border-2 py-5 text-xl">{row.date}</td>
											<td className="border-2 py-5 text-xl">{row.text}</td>
										</tr>
									</tbody>
								))}
							</table>
						)}
					</div>
				</div>

			</div>
		)
	);
}

export default Details;