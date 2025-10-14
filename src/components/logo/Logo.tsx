import { Link } from 'react-router-dom';
import { ReactComponent as LogoImg } from '../../img/logo.svg';

export const Logo = () => {
  return (
    <Link to="/" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <LogoImg />
      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Streamr</span>
    </Link>
  );
};
