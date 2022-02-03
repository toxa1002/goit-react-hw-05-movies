import React, { Component, Suspense, lazy } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ApiMovie from '../services/ApiMovie';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import routes from '../routes';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
    import('../components/Cast' /* webpackChunkName: "movie-cast-page" */),
);
const Reviews = lazy(() =>
    import(
        '../components/Reviews' /* webpackChunkName: "movie-reviews-page" */
    ),
);

export class MovieDetailsPage extends Component {
    static propTypes = {
        id: PropTypes.number,
        overview: PropTypes.string,
        popularity: PropTypes.number,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        title: PropTypes.string,
        genres: PropTypes.array,
    };
    state = {
        id: null,
        // backdrop_path: null,
        overview: null,
        popularity: null,
        poster_path: '',
        release_date: null,
        title: null,
        genres: null,
        status: 'idle',
    };

    async componentDidMount() {
        // console.log('компонент фильм замаунтился');
        // console.log(this.props);
        this.setState({ status: 'pending' });
        try {
            const data = await ApiMovie('', this.props.match.params.moviesId);
            this.setState({ ...data.data });
        } catch (error) {
            toast('По вашему запросу ничего не найдено');
        }
        this.setState({ status: 'idle' });
    }
    handleGoBack = () => {
        const { location, history } = this.props;
        history.push(location?.state?.from || routes.home);
        //    console.log(location, history);
    };

    render() {
        const {
            status,
            poster_path,
            overview,
            popularity,
            title,
            genres,
            release_date,
            id,
        } = this.state;
        const { match, location } = this.props;
        // console.log(this.props);
        return (
            <>
                {status === 'pending' && (
                    <TailSpin
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                )}
                {status === 'idle' && (
                    <article>
                        <button
                            className="button"
                            type="button"
                            onClick={this.handleGoBack}
                        >
                            Go Back
                        </button>
                        <div className={s.MovieCard}>
                            <div className={s.Image}>
                                {poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                                        alt={`${title} movie poster`}
                                    />
                                )}
                            </div>
                            <div>
                                <h2>{title}</h2>
                                <p>Popularity : {popularity}</p>
                                <h3>Overview</h3>
                                <p>{overview}</p>
                                <h3>Genres</h3>
                                {genres && (
                                    <ul>
                                        {genres.map(genr => (
                                            <li key={genr.id}>{genr.name}</li>
                                        ))}
                                    </ul>
                                )}
                                <p>Release date :{release_date}</p>
                            </div>
                        </div>
                        <div>
                            <p>Additional information</p>
                            <ul>
                                <li>
                                    <Link
                                        to={{
                                            pathname: `${match.url}/cast`,
                                            state: {
                                                from:
                                                    location?.state?.from ||
                                                    routes.home,
                                            },
                                        }}
                                    >
                                        Cast
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={{
                                            pathname: `${match.url}/reviews`,
                                            state: {
                                                from:
                                                    location?.state?.from ||
                                                    routes.home,
                                            },
                                        }}
                                    >
                                        Reviews
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Suspense>
                            <Switch>
                                <Route
                                    from={location.state?.from}
                                    path={routes.cast}
                                    render={props => {
                                        return <Cast {...props} movieId={id} />;
                                    }}
                                />
                                <Route
                                    from={location.state?.from}
                                    path={routes.reviews}
                                    render={props => {
                                        return (
                                            <Reviews {...props} movieId={id} />
                                        );
                                    }}
                                />
                            </Switch>
                        </Suspense>
                    </article>
                )}
            </>
        );
    }
}

export default MovieDetailsPage;
