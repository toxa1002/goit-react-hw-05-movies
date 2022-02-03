import React, { Component } from 'react';
import ApiMovie from '../services/ApiMovie';
import MovieList from '../components/MovieList';

export default class HomePage extends Component {
    state = {
        movies: [],
    };
    async componentDidMount() {
        const response = await ApiMovie();
        this.setState({ movies: response.data.results });
    }

    render() {
        const { movies } = this.state;

        return (
            <>
                <h2>Trending today </h2>
                {movies && <MovieList movies={movies} />}
                {/* <ul>
                    {movies.map(film => (
                        <li key={film.id}>
                            <Link to={{
                                pathname: `${routes.movies}/${film.id}`,
                                state:{
                                    from: location, 
                                }
                            }}>{film.title}</Link>
                        </li>
                    ))}
                </ul> */}
            </>
        );
    }
}
