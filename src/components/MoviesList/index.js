import React, { Component } from 'react';
import { fetchMovies } from '../../api/fetchMovies';
import '../../css/atlasflix.css';

export default class MoviesList extends Component {
	state = {
		image: '',
		favorites: [],
		loading: false,
		title: '',
		movies: ''
	};

	/* Handles the search in input field,
	fetching in live the information from the API,
	triggered by onChange property */
	handleSearch(e) {
		const value = e.target.value;
		fetchMovies(value)
			.then((res) => {
				res
					.json()
					.then((data) => {
						this.setState({
							title: value,
							movies: data,
							image: data.Poster
						});
					})
					.catch((err) => console.log('Error', err));
			})
			.catch((err) => console.log('Error', err));
	}

	/* Adds result object from search in state array,
	triggered by onClick button */
	addFavorite = (e) => {
		const favorite = this.state.movies;
		this.setState({
			favorites: [...this.state.favorites, favorite]
		});
		e.preventDefault();
	};

	favoritesData = () => {
		var favorites = this.state.favorites;
		return favorites;
	};

	render() {
		return (
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
							className='button1'
							onClick={(e) => this.addFavorite(e)}
							type='button'
							title='Like!'
						>
							Like!
						</button>
					</form>
				</div>
				<main id='boxes'>
					<div id='favorites-container'>
						<h4>Favorites</h4>
						<ul>
							{this.state.favorites.map((fav) => (
								<li key={fav.imdbID}>{fav.Title}</li>
							))}
						</ul>
					</div>
					<div id='result-container'>
						<h2>{this.state.movies.Title}</h2>

						<h4>{this.state.movies.Year}</h4>

						<img src={this.state.image} alt='' />
					</div>
					<div id='desc-container'>
						<p>{this.state.movies.Plot}</p>
					</div>
				</main>
			</div>
		);
	}
}
