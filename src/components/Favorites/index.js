import React from 'react';
import '../../css/atlasflix.css';

const Favorites = (props) => {
	const favorites = props.location.favProps;

	return (
		<div className='favorites-container'>
			<h1>Favorites</h1>

			{favorites.map((fav) => (
				<div className='favorites-list' key={fav.imdbID}>
					<h2>{fav.Title}</h2>

					<h4>{fav.Year}</h4>

					<img width='100vh' src={fav.Poster} alt='' />
				</div>
			))}
		</div>
	);
};

export default Favorites;
