import axios from 'axios';


const ApiMovie = (searchValue = '', movieId = null) => {
    const apiKey = '6e351807becb3b330fa1c3331d0fe0c6';
    const baseUrl = 'https://api.themoviedb.org/3/trending/movie/day';
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';
    const searchById = 'https://api.themoviedb.org/3/movie/';
    if (searchValue.length !== 0) {
        return axios.get(`${searchUrl}?api_key=${apiKey}&query=${searchValue}`);
    } else if (movieId) {
        return axios.get(`${searchById}${movieId}?api_key=${apiKey}`);
    } else {
        return axios.get(`${baseUrl}?api_key=${apiKey}`);
    }
};

export default ApiMovie;
