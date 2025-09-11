import { Link } from 'react-router-dom';
import './HeaderMenu.sass';

export const HeaderMenu = () => {
  return (
    <ul className="header-menu__list">
      <li className="header-menu__item">
        <Link to="#">Home</Link>
      </li>
      <li className="header-menu__item">
        <Link to="#">Browse</Link>
      </li>
      <li className="header-menu__item">
        <Link to="#">Esports</Link>
      </li>
    </ul>
  );
};
