import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { fetchMovies } from '../../api/fetchMovies';
import '../../css/atlasflix.css';
import MovieDetails from '../MovieDetails';

export default class MoviesList extends Component {
	state = {
		favorites: [],
		loading: false,
		title: '',
		movies: ''
	};

	handleSearch(e) {
		const value = e.target.value;
		fetchMovies(value)
			.then((res) => {
				res
					.json()
					.then((data) => {
						this.setState({
							title: value,
							movies: data
						});
					})
					.catch((err) => console.log('Error', err));
			})
			.catch((err) => console.log('Error', err));
	}

	addFavorite = (e) => {
		const favorite = this.state.movies;
		this.setState({
			favorites: [...this.state.favorites, favorite]
		});
		console.log('fav', this.state.favorites);
		e.preventDefault();
	};

	render() {
		return (
			<Router>
				<div>
					<div className='page-title'>
						<h1>AtlasFlix</h1>
					</div>
					<div>
						<form>
							<input
								className='text-field'
								id='search'
								type='text'
								placeholder='Search by movie title'
								value={this.state.title}
								onChange={(e) => this.handleSearch(e)}
							/>
							<button
								onClick={(e) => this.addFavorite(e)}
								type='button'
								title='Like!'
							>
								Like!
							</button>
						</form>
					</div>
					<div>
						<Link to={`/${this.state.movies.Title}`}>
							<h2>{this.state.movies.Title}</h2>
						</Link>
						<h4>{this.state.movies.Year}</h4>
					</div>
					<Switch>
						<Route path='/'>
							<MoviesList />
						</Route>
						<Route path={`/${this.state.movies.Title}`}>
							<MovieDetails {...this.state.movies} />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}
