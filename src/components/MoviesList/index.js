import React, { Component } from 'react';
import { fetchMovies } from '../../api/fetchMovies';
import '../../css/atlasflix.css';

export default class MoviesList extends Component {
	state = {
		loading: '',
		title: '',
		movies: []
	};

	handleSearch(e) {
		const value = e.target.value;
		fetchMovies(value).then((res) => {
			res
				.json()
				.then((data) => {
					this.setState({
						title: value,
						movies: data
					});
				})
				.catch((err) => console.log('Error', err));
		});
	}

	movieInfo = () => {
		const { movies, title } = this.state;

		return title !== null ? (
			<>
				<h2>
					<i>Title:</i> {movies.Title}
				</h2>
				<h4>
					<i>Year:</i> {movies.Year}
				</h4>
			</>
		) : (
			<h4>Movie not found!</h4>
		);
	};

	render() {
		return (
			<div>
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
				<div>{this.movieInfo()}</div>
			</div>
		);
	}
}
