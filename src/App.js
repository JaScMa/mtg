import Search from "./Search";
import Details from "./Details";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { ReactComponent as Home } from "./img/home.svg";

const App = () => {
  return (
		<HashRouter>
			<div className="h-screen w-screen fixed overflow-y-scroll bg-gradient-to-t from-blueishGreen via-lightPurple to-darkPurple">
				<header>
					<Link to="/"><Home className="m-2" alt="home" width="20pt" height="20pt" fill="white"/></Link>
				</header>
				<main>
					<Switch>
						<Route path="/Details/:id" element={<Details />} />
						<Route path="/" element={<Search />} />
					</Switch>
					<div className="h-20 w-screen"></div>
				</main>
			</div>
		</HashRouter>
	);
}

export default App;
