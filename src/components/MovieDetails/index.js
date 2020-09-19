import React from 'react';
import '../../css/atlasflix.css';

const MovieDetails = (props) => {
	const movie = props.location.movProps;
	console.log('mov', movie);
	return (
		<div className='movies-container'>
			<h1>Movie Information</h1>
			<div className='row'>
				<div className='column'>
					<h2>{movie.Title}</h2>
					<h4>{movie.Year}</h4>
					<p>
						<b>Released:</b> <i>{movie.Released}</i>
					</p>
					<p>
						<b>Runtime:</b> <i>{movie.Runtime}</i>
					</p>
					<p>
						<b>Genre:</b> <i>{movie.Genre}</i>
					</p>
					<p>
						<b>Director:</b> <i>{movie.Director}</i>
					</p>
					<p>
						<b>Writer:</b> <i>{movie.Writer}</i>
					</p>
					<p>
						<b>Actors:</b> <i>{movie.Actors}</i>
					</p>
				</div>
				<div className='column'>
					<img src={movie.Poster} alt='' />
				</div>
				<div className='column'>{movie.Plot}</div>
			</div>
		</div>
	);
};

export default MovieDetails;
