const routes = {
    home: '/',
    movies: '/movies',
    moviesSearch: '/movies?query=:query',
    movieDetails: '/movies/:moviesId',
    cast: '/movies/:moviesId/cast',
    reviews: '/movies/:moviesId/reviews',
};
export default routes