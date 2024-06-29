import { Link } from 'react-router-dom';
import styles from './authNav.module.css';

const AuthNav = () => {
  return (
    <div>
      <Link to="/login" className={styles.link}>
        Login
      </Link>
      <Link to="/register" className={styles.link}>
        Register
      </Link>
    </div>
  );
};

export default AuthNav;
