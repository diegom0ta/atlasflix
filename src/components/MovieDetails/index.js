import React, { useState, useEffect } from 'react';
import { fetchMoviesById } from '../../api/fetchMovies';
import '../../css/atlasflix.css';

const MovieDetails = (props) => {
	const movie = props.location.movProps;
	const [movieInfo, setMovieInfo] = useState({});

	const handleSearchById = (id) => {
		id = movie.imdbID;
		fetchMoviesById(id)
			.then((res) => {
				res
					.json()
					.then((data) => {
						setMovieInfo(data);
					})
					.catch((err) => console.log('Error', err));
			})
			.catch((err) => console.log('Error', err));
	};

	useEffect((id) => {
		handleSearchById(id);
	}, []);

	return (
		<div className='movies-container'>
			<h1>Movie Information</h1>
			<div className='row'>
				<div className='column'>
					<h2>{movieInfo.Title}</h2>
					<h4>{movieInfo.Year}</h4>
					<p>
						<b>Released:</b> <i>{movieInfo.Released}</i>
					</p>
					<p>
						<b>Runtime:</b> <i>{movieInfo.Runtime}</i>
					</p>
					<p>
						<b>Genre:</b> <i>{movieInfo.Genre}</i>
					</p>
					<p>
						<b>Director:</b> <i>{movieInfo.Director}</i>
					</p>
					<p>
						<b>Writer:</b> <i>{movieInfo.Writer}</i>
					</p>
					<p>
						<b>Actors:</b> <i>{movieInfo.Actors}</i>
					</p>
				</div>
				<div className='column'>
					<img src={movieInfo.Poster} alt='' />
				</div>
				<div className='column'>{movieInfo.Plot}</div>
			</div>
		</div>
	);
};

export default MovieDetails;
