import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';
import styles from './appBar.module.css';

const AppBar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <header className={styles.appBar}>
      <div>
        <Link to="/" className={styles.logo}>
          Home
        </Link>
        {isLoggedIn && (
          <Link to="/contacts" className={styles.logo}>
            PhoneBook
          </Link>
        )}
      </div>
      <nav>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <Link to="/login" className={styles.navItem}>
              Login
            </Link>
            <Link to="/register" className={styles.navItem}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default AppBar;
