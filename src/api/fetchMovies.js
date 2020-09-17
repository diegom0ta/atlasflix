export const fetchMovies = async (movieTitle) => {
	const response = await fetch(
		'http://www.omdbapi.com/?t=' + movieTitle + '&apikey=b744f87c'
	);
	return response;
};