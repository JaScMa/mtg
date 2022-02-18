import { useParams } from "react-router-dom";

const Details = () => {
	let { id } = useParams();

	return <h1> {id} is here</h1>;
}

export default Details;