import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';

import LogIn from './components/LogIn';

import SavePage from './components/SavePage';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';
import Logout from './components/Logout';
import AddPicture from './components/AddPicture';
import { useSelector } from "react-redux";


function App() {

	const state = useSelector(state => ({
		loading:state.login.loading,
		isLogged:state.login.isLogged,
		loginError: state.login.error,
		imageError: state.images.error
	}))

	let messageArea = <></>
	if (state.loading) {
		messageArea = <h4>Loading..<hr />.</h4>
	}
	if (state.loginError) {
		messageArea = <h4>{state.loginError}<hr /></h4>
	} else if (state.imageError) {
		messageArea = <h4>{state.imageError}<hr /></h4>
	}


	let tempRender = <Routes>
		<Route exact path="/" element={<LogIn />} />
		<Route path="*" element={<Navigate to="/" />} />
	</Routes>

	if (state.isLogged) {
		tempRender = <Routes>
			<Route exact path="/" element={<Home />} />
			<Route path="/saved" element={<SavePage />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/add" element={<AddPicture />} />
			<Route path="/posts" element={<MyPosts />} />
			<Route path="/Logout" element={<Logout />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	}
	return (

		<div className="App">

			{messageArea}
			{tempRender}
		</div>
	);
}

export default App;
