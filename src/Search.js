import {  useEffect, useRef, useState } from "react";
import Result from "./Result";
import Spinner from "./Spinner";
import "./style/search.css";
import { ReactComponent as White} from "./img/mtg-white.svg";
import { ReactComponent as Green } from "./img/mtg-green.svg";
import { ReactComponent as Blue } from "./img/mtg-blue.svg";
import { ReactComponent as Black } from "./img/mtg-black.svg";
import { ReactComponent as Red } from "./img/mtg-red.svg";


const types = ["land", "creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"];
const rarities = ["common", "uncommon", "rare", "mythic"];

const Search = () => {

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [rarity, setRarity] = useState("");
    const [cards, setCards] = useState("");
    const [state, setState] = useState("notLoaded");
    const [page, setPage] = useState(1);
	const [pageEdge, setPageEdge] = useState("min")
    const [maxPage, setMaxPage] = useState(99);
    const pageSize = 50;
	const win = useRef();




    const fetchCards = async (page) => {
        setState("loading");
		if(page >= maxPage) {
			page = maxPage;
			setPageEdge("max")
		}
		else if(page <= 1){
			page = 1;
			setPageEdge("min");
		}
		else {
			setPageEdge("");
		}
        setPage(page);
        const url = `https://api.magicthegathering.io/v1/cards?name=${name}&colors=${color}&types=${type}&rarity=${rarity}&page=${page}&pageSize=${pageSize}`;
        fetch(url)
            .then(response=>{
                    setMaxPage(Math.ceil(response.headers.get("total-count")/pageSize));
                    return response.json();
                })
            .then(data => {
                setCards(data.cards);
                setState("loaded");
            })
			
			win.current.scrollIntoView();
    }

	useEffect(() => {
	},[])


    return (
			<div className="center">
				<form
					className="search-box shadow-xl bg-gradient-to-t from-blueishGreen via-lightPurple to-darkPurple"
					onSubmit={(e) => {
						e.preventDefault();
						fetchCards(1);
					}}
				>
					<input
						className="w-4/5 max-w-md"
						id="cardName"
						placeholder="Name"
						onChange={(change) => setName(change.target.value.trim())}
					/>

					<select
						className="w-4/5 max-w-md"
						id="type"
						onChange={(change) => {
							setType(change.target.value);
						}}
						style={{ color: type === "" ? "#9da4b0" : "white" }}
					>
						<option value="">Type</option>
						{types.map((type) => (
							<option value={type} key={type}>
								{type}
							</option>
						))}
					</select>

					<select
						className="w-4/5 max-w-md"
						id="rarity"
						onChange={(change) => setRarity(change.target.value)}
						style={{ color: rarity === "" ? "#9da4b0" : "white" }}
					>
						<option value="" key="">
							Rarity
						</option>
						{rarities.map((rarity) => (
							<option value={rarity} key={rarity}>
								{rarity}
							</option>
						))}
					</select>

					<div className="flex justify-around flex-row p-3">
						<White
							alt="white"
							className={
								color.includes("white,") ? "fill-white" : "fill-stone-500"
							}
							onClick={() =>
								setColor(
									color.includes("white,")
										? color.replace("white,", "")
										: color.concat("white,")
								)
							}
						/>
						<Red
							alt="red"
							className={
								color.includes("red,") ? "fill-red-800" : "fill-stone-500"
							}
							onClick={() =>
								setColor(
									color.includes("red,")
										? color.replace("red,", "")
										: color.concat("red,")
								)
							}
						/>
						<Blue
							alt="blue"
							className={
								color.includes("blue,") ? "fill-blue-600" : "fill-stone-500"
							}
							onClick={() =>
								setColor(
									color.includes("blue,")
										? color.replace("blue,", "")
										: color.concat("blue,")
								)
							}
						/>
						<Green
							alt="green"
							className={
								color.includes("green,") ? "fill-green-900" : "fill-stone-500"
							}
							onClick={() =>
								setColor(
									color.includes("green,")
										? color.replace("green,", "")
										: color.concat("green,")
								)
							}
						/>
						<Black
							alt="black"
							className={
								color.includes("black,") ? "fill-black" : "fill-stone-500"
							}
							onClick={() =>
								setColor(
									color.includes("black,")
										? color.replace("black,", "")
										: color.concat("black,")
								)
							}
						/>
					</div>
					<button className="hover:brightness-110 shadow-lg bg-gradient-to-b from-burningRed to-deepBlue">
						Search
					</button>
				</form>
				<div ref={win}>
					{state === "loaded" && (
						<div>
							<Result cards={cards} />
							<div className="flex flex-row  justify-center p-5 pb-0">
								<p
									className={`cursor-pointer mx-2 font-bold text-3xl self-center ${
										pageEdge === "min" ? "visibility: hidden" : "" //wird nur angezeigt bei page>1
									}`}
									onClick={() => {
										fetchCards(page - 1);
									}}
								>
									Prev   
								</p>
								<form 
								onSubmit={ (e) => {
										e.preventDefault();
											fetchCards(page);
									}}
								>

								<input
									onClick = { e => {
										e.target.select();
									}}
									type="number"
									value={page}
									step="1"
									className="w-10 h-8 text-sm text-center mx-5 my-0"
									onChange={ e => {
										setPage(e.target.value)
									}
									}
								/>
								</form>

								<p
									className={`cursor-pointer mx-2 font-bold text-3xl self-center ${
										pageEdge === "max" ? "visibility: hidden" : " " //wird nur angezeigt bei page<maxPage
									}`}
									onClick={() => {
										fetchCards(page + 1);
									}}
								>
									Next
								</p>
							</div>
							<div>
								<p className="text-center">of {maxPage}</p>
							</div>
						</div>
					)}
					{state === "loading" && <Spinner />}
				</div>
			</div>
		);
	}
	
	export default Search;