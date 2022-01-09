import { useState } from "react";
import "./style/search.css"



const colors = ["colorless", "blue", "green", "red", "black", "white"];
const types = ["land", "creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"];
const rarities = ["common", "uncommon", "rare", "mythic"];

const Search = () => {

    return(
        <div className="center">
            <form className="search-box">
                <label htmlFor="cardName">
                    Name 
                    <input 
                    id="cardName"
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
            </form>
        </div>
    )
}

export default Search;