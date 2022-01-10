import { useState } from "react";
import "./style/search.css"



const colors = ["colorless", "blue", "green", "red", "black", "white"];
const types = ["land", "creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"];
const rarities = ["common", "uncommon", "rare", "mythic"];

const Search = () => {

    const [name, setName] = useState("");
    const mtg = require('mtgsdk');

    

    const fetchCards = async () => {
        mtg.card.find(3)
        .then(result => {
            console.log(result.card.name) // "Black Lotus"
        })    }

    return(
        <div className="center">
            <form 
            className="search-box"
            onSubmit={(e) => {
                e.preventDefault();
                fetchCards();
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
                    >
                        {types.map((type) => (
                            <option>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="rarity">
                    Rarity
                    <select 
                    id="rarity"
                    >
                        {rarities.map((rarity) => (
                            <option>
                                {rarity}
                            </option>
                        ))}
                        
                    </select>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Search;