import Search from "./Search";
import Details from "./Details";
import {BrowserRouter, Route, Switch, Link, Routes} from "react-router-dom";

const App = () => {
  return (
		<BrowserRouter>
			<div className="h-screen w-screen fixed overflow-y-scroll bg-gradient-to-t from-blueishGreen via-lightPurple to-darkPurple">
				<header>
					<Link to="/">HOME</Link>
				</header>
				<main>
					<Routes>
						<Route path="/" element={<Search />} />
            <Route path=":id" element={<Details />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
