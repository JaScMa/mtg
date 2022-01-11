import { useState } from "react";
import Result from "./Result";
import "./style/search.css"




const colors = ["colorless", "blue", "green", "red", "black", "white"];
const types = ["land", "creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"];
const rarities = ["common", "uncommon", "rare", "mythic"];

const Search = () => {

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [rarity, setRarity] = useState("");
    const [cards, setCards] = useState("");
    const mtg = require('mtgsdk');

    

    const fetchCards = async (name, color, type, rarity) => {
        mtg.card.where({name: name, colors: color, types: type, rarity: rarity})
            .then(cards => {
                setCards(cards);
        })
    }

    return(
        <div className="center">
            <form 
            className="search-box"
            onSubmit={(e) => {
                e.preventDefault();
                fetchCards(name, color, type, rarity);
            }}
            >
                <label htmlFor="cardName">
                    Name 
                    <input 
                    id="cardName"
                    placeholder="Name"
                    onChange={(change)=> setName(change.target.value)}
                    />
                </label>
                <label htmlFor="color">
                    Color
                    <select
                        id="color"
                        onChange={(change)=> setColor(change.target.value)}
                    >
                            {colors.map((color) => (
                                <option value={color} key={color}>
                                    {color}
                                </option>
                            ))}
                    </select>
                </label>
                <label htmlFor="type">
                    Type
                    <select
                        id="type"
                        onChange={(change)=> setType(change.target.value)}
                    >
                        {types.map((type) => (
                            <option value={type} key={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="rarity">
                    Rarity
                    <select 
                        id="rarity"
                        onChange={(change)=> setRarity(change.target.value)}
                    >
                        {rarities.map((rarity) => (
                            <option value={rarity} key={rarity}>
                                {rarity}
                            </option>
                        ))}
                        
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Result cards={cards} />
        </div>
    )
}

export default Search;