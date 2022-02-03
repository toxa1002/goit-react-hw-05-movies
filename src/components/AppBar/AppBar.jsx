import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import s from './AppBar.module.css';

export default function AppBar() {
    return (
        <header className={s.header}>
            <ul className={s.NavList}>
                <li className={s.ListItem}>
                    <NavLink
                        exact
                        to={routes.home}
                        className={s.NavLink}
                        activeClassName={s.ActiveLink}
                    >
                        HOME
                    </NavLink>
                </li>
                <li className={s.ListItem}>
                    <NavLink
                        to={routes.movies}
                        className={s.NavLink}
                        activeClassName={s.ActiveLink}
                    >
                        MOVIE
                    </NavLink>
                </li>
            </ul>
        </header>
    );
}
