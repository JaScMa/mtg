import Card from "./Card";


const Result = ({ cards }) => {
    return (
         (!cards.length) ? 
            <h1>Sorry, we couldn't find any matching cards</h1> :
            (
                cards.map(card => (
                    <Card card={card} key={card.id} />
                ))
            )
    )
}

export default Result;