import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FetchCastReviews from '../../services/FetchCastReviews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Reviews extends Component {
    static propTypes = {
        movieId: PropTypes.number.isRequired,
    };
    state = {
        reviews: [],
    };
    async componentDidMount() {
        const reviews = 'reviews';
        try {
            const data = await FetchCastReviews(
                Number(this.props.movieId),
                reviews,
            );
            this.setState({ reviews: data.data.results });
        } catch (error) {
            return toast.error(
                `С запросом что-то пошло не так! Перезагрузите страницу и попробуйте снова `,
            );
        }
    }

    render() {
        const { reviews } = this.state;
        const { movieId } = this.props;
        if (reviews.length !== 0 && movieId) {
            return (
                <ul>
                    {reviews.map(el => {
                        return (
                            <li key={el.id}>
                                <h3>{el.author}</h3>
                                <p>{el.content}</p>
                            </li>
                        );
                    })}
                </ul>
            );
        } else return <h2>We dont have any reviews for this movie</h2>;
    }
}
