import { NavLink, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import routes from '../../routes';
import s from './MovieList.module.css';

export class MovieList extends Component {
    render() {
        const { location, movies } = this.props;
        return (
            <ul className={s.List}>
                {movies.map(film => (
                    <li key={film.id} className={s.item}>
                        <NavLink
                            className={s.Link}
                            to={{
                                pathname: `${routes.movies}/${film.id}`,
                                state: {
                                    from: location,
                                },
                            }}
                        >
                            {film.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        );
    }
}

export default withRouter(MovieList);
