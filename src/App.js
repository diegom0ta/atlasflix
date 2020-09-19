import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';

function App() {
	return (
		<Switch>
			<Route exact path='/Home' component={Home} />
			<Route exact path='/'>
				<Redirect to='/Home' />
			</Route>
			<Route exact path='/Favorites' component={Favorites} />
			<Route exact path='/MovieDetails' component={MovieDetails} />
		</Switch>
	);
}

export default App;
