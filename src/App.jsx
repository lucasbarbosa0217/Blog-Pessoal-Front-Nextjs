import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Theme from "./Theme/Theme";
import PostPage from "./PostPage/PostPage";

function App() {
	return (
		<>
			<Theme></Theme>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/post/:blogtitle" element={<PostPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
