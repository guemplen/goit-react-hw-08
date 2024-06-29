import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      {isLoggedIn && (
        <Link to="/contacts" className={styles.link}>
          PhoneBook
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
