import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from '../components/SearchMovie';
import getQueryFromUrl from '../utils/getQueryFromUrl';
import ApiMovie from '../services/ApiMovie';
import MovieList from '../components/MovieList';

class MoviesPage extends Component {
    static propTypes = {
        search: PropTypes.string,
    };

    state = {
        search: '',
        movies: [],
        status: 'idle',
    };

    componentDidMount() {
        const { query } = getQueryFromUrl(this.props.location.search);
        if (query) {
            this.setState({ search: query });
        }
        // console.log('компонент поиск фильмов');
    }

    async componentDidUpdate(prevProps, prevState) {
        const prev = prevState.search;
        const next = this.state.search;

        if (prev !== next) {
            this.setState({ status: 'pending' });
            try {
                const data = await ApiMovie(this.state.search, null);
                this.setState({
                    movies: data.data.results,
                });
            } catch (error) {
                toast.error('Попробуйте позже!', {
                    autoClose: false,
                    position: 'top-center',
                });
            }
            if (this.state.movies.length !== 0) {
                // console.log('список фильмов получил');
                this.setState({ status: 'resolved' });
            } else {
                this.setState({ status: 'idle' });
                toast('По вашему запросу ничего не найдено');
            }
        }
    }
    componentWillUnmount() {
        // console.log('компонент список фильмов поиска размонтирован');
        this.reset();
    }
    
    reset = () => {
        this.setState = {
            search: '',
            movies: [],
            status: 'idle',
        };
    };

    handleSearchFormSubmit = search => {
        this.setState({ search });
        const { history, location } = this.props;
        history.push({
            pathname: location.pathname,
            search: `query=${search}`,
        });
    };
    render() {
        const { status, movies } = this.state;
        return (
            <>
                <div>
                    <Searchbar onSubmitForm={this.handleSearchFormSubmit} />
                </div>
                {status === 'pending' && (
                    <TailSpin
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                )}
                {status === 'resolved' && <MovieList movies={movies} />}
            </>
        );
    }
}

export default MoviesPage;
