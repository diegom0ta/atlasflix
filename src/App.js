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
			<Route
				exact
				path='/Favorites'
				render={(props) => <Favorites {...props} isAuthed={true} />}
			/>
			<Route
				exact
				path='/MovieDetails'
				render={(props) => <MovieDetails {...props} isAuthed={true} />}
			/>
		</Switch>
	);
}

export default App;
