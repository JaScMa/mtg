import { useState } from "react";
import Result from "./Result";
import Spinner from "./Spinner";
import "./style/search.css"
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
    const mtg = require('mtgsdk');
    const [page, setPage] = useState(1);

    const fetchCards = async (name, color, type, rarity, page) => {
        const url = `https://api.magicthegathering.io/v1/cards?name=${name}&colors=${color}&types=${type}&rarity=${rarity}&page=${page}`;
        fetch(url)
            .then(response=>{
                    console.log(response.headers.get("total-count"));
                    return response.json();
                })
            .then(data => {
                console.log(data.cards);
                setCards(data.cards);
                setState("loaded");
            })
    }


    const loadingState = (state) => {
        switch (state) {
            case "loaded": 
                return (
                    <div>
                        < Result cards = { cards } />
                        <div className="flex justify-center">
                            <p className="cursor-pointer" onClick={() => {
                                setPage(page+1);
                                fetchCards(name, color, type, rarity, page+1);
                                setState("loading");
                                }}>Next</p>
                        </div>
                    </div>
                );
            case "loading":
                return (<Spinner/>);
            default: 
                return (<div></div>)
        }
    }

    return(
        <div className="center">
            <form 
            className="search-box shadow-xl bg-gradient-to-t from-blueishGreen via-lightPurple to-darkPurple"
            onSubmit={(e) => {
                e.preventDefault();
                setPage(1);
                fetchCards(name, color, type, rarity, 1);
                setState("loading");
            }}
            >

    
                    <input 
                    id="cardName"
                    placeholder="Name"
                    onChange={(change)=> setName(change.target.value)}
                    />

                    <select
                        id="type"
                        onChange={(change)=> setType(change.target.value)}
                        style={{color : (type === "")? "#9da4b0" : "black"}}
                        >
                        <option value="">Type</option>
                        {types.map((type) => (
                            <option value={type} key={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select 
                        id="rarity"
                        onChange={(change)=> setRarity(change.target.value)}
                        style={{color : (rarity === "")? "#9da4b0" : "black"}}
                        >   
                        <option value="" key="">Rarity</option>
                        {rarities.map((rarity) => (
                            <option value={rarity} key={rarity}>
                                {rarity}
                            </option>
                        ))}
                        
                    </select>
                    <div className="flex justify-around flex-row p-3">
                            <White 
                            alt="white"
                            className={((color==="white") ? "fill-white" : "fill-stone-500")}
                            onClick={() => (setColor((color === "white") ? "" : "white"))}
                            />
                            <Red 
                            alt="red"
                            className={(color==="red") ? "fill-red-800" : "fill-stone-500"}
                            onClick={() => (setColor((color === "red") ? "" : "red"))}
                            />
                            <Blue 
                            alt="blue"
                            className={(color==="blue") ? "fill-blue-600" : "fill-stone-500"}
                            onClick={() => (setColor((color === "blue") ? "" : "blue"))}
                            />
                            <Green 
                            alt="green"
                            className={(color==="green") ? "fill-green-900" : "fill-stone-500"}
                            onClick={() => (setColor((color === "green") ? "" : "green"))}
                            />
                            <Black 
                            alt="black"
                            className={(color==="black") ? "fill-black" : "fill-stone-500"}
                            onClick={() => (setColor((color === "black") ? "" : "black"))}
                            />
                           
                    </div>
                <button className="hover:brightness-110 shadow-lg bg-gradient-to-b from-burningRed to-deepBlue">
                    Search
                </button>
            </form>
            <div>
                {loadingState(state)}
            </div>
        </div>
    )
}

export default Search;