import axios from 'axios';

const FetchCastReviews = (movieId = null, fetch = '') => {
    const apiKey = '6e351807becb3b330fa1c3331d0fe0c6';
    const fetchByIdCastReviews = 'https://api.themoviedb.org/3/movie/';
    return axios.get(
        `${fetchByIdCastReviews}${movieId}/${fetch}?api_key=${apiKey}`,
    );
};

export default FetchCastReviews;
