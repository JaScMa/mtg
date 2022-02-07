import { useState } from "react";
import Result from "./Result";
import Spinner from "./Spinner";
import "./style/search.css"
import searchImg from "./img/search.png"





const colors = ["colorless", "blue", "green", "red", "black", "white"];
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

    

    const fetchCards = async (name, color, type, rarity) => {
        mtg.card.where({name: name, colors: color, types: type, rarity: rarity})
            .then(cards => {
                setCards(cards);
                setState("loaded");
        })
    }

    const loadingState = (state) => {
        switch (state) {
            case "loaded": 
                return (< Result cards = { cards } />);
            case "loading":
                return (<Spinner/>);
            default: 
                return (<div></div>)
        }
    }

    return(
        <div className="center">
            <form 
            className="search-box"
            onSubmit={(e) => {
                e.preventDefault();
                setState("loading");
                fetchCards(name, color, type, rarity)
            }}
            >

    
                    <input 
                    id="cardName"
                    placeholder="Name"
                    onChange={(change)=> setName(change.target.value)}
                    />

                    <select
                        id="color"
                        onChange={(change)=> setColor(change.target.value)}
                    >
                        <option value="">Color</option>
                            {colors.map((color) => (
                                <option value={color} key={color}>
                                    {color}
                                </option>
                            ))}
                    </select>

                    <select
                        id="type"
                        onChange={(change)=> setType(change.target.value)}
                    >
                        <option value={""}>Type</option>
                        {types.map((type) => (
                            <option value={type} key={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select 
                        id="rarity"
                        onChange={(change)=> setRarity(change.target.value)}
                    >   
                        <option value={""}>Rarity</option>
                        {rarities.map((rarity) => (
                            <option value={rarity} key={rarity}>
                                {rarity}
                            </option>
                        ))}
                        
                    </select>
                <button>
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