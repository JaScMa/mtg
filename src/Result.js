import Card from "./Card";


const Result = ({ cards }) => {
    return (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        { (!cards.length) ? 
            <h1>Sorry, we couldn't find any matching cards</h1> :
            (
                cards.map((card) => (
                    <Card card={card} key={card.id} />
                ))
            )}
        </div>
    )
}

export default Result;