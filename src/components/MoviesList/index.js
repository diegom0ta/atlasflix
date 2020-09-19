import React, { Component } from 'react';
import { fetchMovies } from '../../api/fetchMovies';
import { Link } from 'react-router-dom';
import star from '../../assets/like.png';
import '../../css/atlasflix.css';

export default class MoviesList extends Component {
	state = {
		image: '',
		favorites: [],
		loading: false,
		title: JSON.parse(localStorage.getItem('@atlasflix/search')) || [],
		movies: [],
		errorMsg: '',
		response: ''
	};

	/* Handles the search in input field,
	fetching in live the information from the API,
	triggered by onChange property */
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
			'@atlasflix/search',
			JSON.stringify(this.state.title)
		);
	};

	componentWillUnmount() {
		this.handleStoredSearch();
	}

	/* Adds result object from search in state array if it's not null
	and if it doesn't exists in the array, triggered by onClick button */
	addFavorite = (movie) => {
		if (!this.state.favorites.includes(movie)) {
			this.setState({
				favorites: [...this.state.favorites, movie]
			});
		} else return;
		console.log('favs', this.state.favorites);
	};

	handleStarClick = (e) => {
		this.addFavorite(e);
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
					</form>
				</div>
				<main id='box'>
					<div id='result-container'>
						{this.state.response !== 'False' ? (
							this.state.movies.map((movie) => (
								<div key={movie.imdbID}>
									<Link
										to={{
											pathname: '/MovieDetails',
											movProps: movie
										}}
									>
										<h2>{movie.Title}</h2>
									</Link>
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
												width='20%'
												src={star}
												alt=''
												//onClick={this.handleStarClick(movie)}
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
						<Link to='/Favorites'>
							<h3>Favorites</h3>
						</Link>
					</div>
				</main>
			</div>
		);
	}
}
