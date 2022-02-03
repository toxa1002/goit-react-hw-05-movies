import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FetchCastReviews from '../../services/FetchCastReviews';

export default class Cast extends Component {
    static propTypes = {
        movieId: PropTypes.number.isRequired,
    };
    state = {
        cast: [],
    };
    async componentDidMount() {
        const cast = 'credits';
        try {
            const data = await FetchCastReviews(
                Number(this.props.movieId),
                cast,
            );
            this.setState({ cast: data.data.cast });
        } catch (error) {
            return toast.error(
                `С запросом что-то пошло не так! Перезагрузите страницу и попробуйте снова `,
            );
        }

        // console.log(this.state.cast);
    }
    render() {
        const { cast } = this.state;
        const { movieId } = this.props;
        if (cast.length !== 0 && movieId) {
            return (
                <ul>
                    {cast.map(el => {
                        return (
                            <li key={el.id}>
                                {el.profile_path && (
                                    <div>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${el.profile_path}`}
                                            alt="foto of actor {el.name}"
                                        />
                                    </div>
                                )}
                                <h3>{el.name}</h3>
                                <p>Character : {el.character}</p>
                            </li>
                        );
                    })}
                </ul>
            );
        } else return <h2>Can not find any information</h2>;
    }
}
