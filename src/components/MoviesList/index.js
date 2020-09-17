import React, { Component } from 'react';
import { fetchMovies } from '../../api/fetchMovies';

export default class MoviesList extends Component {
	state = {
		title: '',
		movies: []
	};

	handleSearch(e) {
		const result = fetchMovies(e.target.value);
		console.log('result', result);
		this.setState({
			title: e.target.value,
			movies: result
		});
	}

	render() {
		return (
			<div>
				<div>
					<form>
						<input
							id='search'
							type='text'
							placeholder='Search by movie title'
							value={this.state.title}
							onChange={(e) => this.handleSearch(e)}
						/>
					</form>
				</div>
				<div>
					<h2>{this.state.title}</h2>
					<p>{this.state.movies.title}</p>
				</div>
			</div>
		);
	}
}
