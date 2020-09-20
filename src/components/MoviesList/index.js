import React, { Component } from 'react';
import { fetchMovies } from '../../api/fetchMovies';
import { Link } from 'react-router-dom';
import like from '../../assets/like.png';
import '../../css/atlasflix.css';

export default class MoviesList extends Component {
	state = {
		image: '',
		favorites: JSON.parse(localStorage.getItem('@atlasflix/favorites')) || [],
		loading: false,
		title: JSON.parse(localStorage.getItem('@atlasflix/searchTitle')) || [],
		movies: JSON.parse(localStorage.getItem('@atlasflix/searchResult')) || [],
		errorMsg: '',
		response: ''
	};

	/* Handles the search in input field,
	fetching in live the information from the API,
	triggered by onChange input field property */
	handleSearch = (e) => {
		const value = e.target.value;
		fetchMovies(value)
			.then((res) => {
				res
					.json()
					.then((data) => {
						this.setState({
							title: value,
							movies: data.Search,
							errorMsg: data.Error,
							response: data.Response
						});
					})
					.catch((err) => console.log('Error', err));
			})
			.catch((err) => console.log('Error', err));
	};

	/* Handles the search state value of the component */
	handleStoredSearch = () => {
		window.localStorage.setItem(
			'@atlasflix/searchTitle',
			JSON.stringify(this.state.title)
		);
		window.localStorage.setItem(
			'@atlasflix/searchResult',
			JSON.stringify(this.state.movies)
		);
	};

	/* Handles the favorites selection state value of the component */
	handleStoredFavorites = () => {
		window.localStorage.setItem(
			'@atlasflix/favorites',
			JSON.stringify(this.state.favorites)
		);
	};

	/* Adds result object from search in state array
	if itdoesn't exists in the array,
	triggered by like image onClick property  */
	handleAddFavorite = (id) => {
		const favMovie = this.state.movies.find((movie) => movie.imdbID === id);

		if (!this.state.favorites.includes(favMovie)) {
			this.setState({
				favorites: [...this.state.favorites, favMovie]
			});
		} else return;
	};

	componentWillUnmount() {
		this.handleStoredSearch();
		this.handleStoredFavorites();
	}

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
					</form>
				</div>
				<main id='box'>
					<div id='result-container'>
						{this.state.response !== 'False' ? (
							this.state.movies.map((movie) => (
								<div key={movie.imdbID}>
									<h2>
										<Link
											to={{
												pathname: '/MovieDetails',
												movProps: movie
											}}
										>
											{movie.Title}
										</Link>
									</h2>
									<h4>{movie.Year}</h4>
									<div className='row'>
										<div className='column'>
											<Link
												to={{
													pathname: '/MovieDetails',
													movProps: movie
												}}
											>
												<img src={movie.Poster} alt='' />
											</Link>
										</div>
										<div className='column'>
											<img
												id={movie.imdbID}
												width='20%'
												src={like}
												alt=''
												onClick={(e) => this.handleAddFavorite(e.target.id)}
											/>
										</div>
									</div>
								</div>
							))
						) : (
							<h2>{this.state.errorMsg}</h2>
						)}
					</div>
					<div id='favorites-container'>
						<h3>
							<Link
								to={{
									pathname: '/Favorites',
									favProps: this.state.favorites
								}}
							>
								Favorites
							</Link>
						</h3>
						<ul>
							{this.state.favorites.map((fav) => (
								<li key={fav.imdbID}>
									<p>{fav.Title}</p>
								</li>
							))}
						</ul>
					</div>
				</main>
			</div>
		);
	}
}
