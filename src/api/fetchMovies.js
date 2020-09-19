/* Fetches JSON information from OMDb API receiving as argument
input keyword from the user */
export const fetchMovies = async (movieTitle) => {
	const response = await fetch(
		'http://www.omdbapi.com/?s=' + movieTitle + '&apikey=b744f87c'
	);
	return response;
};

/* Fetches JSON information from OMDb API receiving as argument
Movie ID to perform the request */
export const fetchMoviesById = async (movieId) => {
	const response = await fetch(
		'http://www.omdbapi.com/?i=' + movieId + '&apikey=b744f87c'
	);
	return response;
};
