import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/auth/operations';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import styles from './userMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className={styles.userMenu}>
      <div className={styles.userInfo}>
        <FaUserAlt className={styles.icon} />
        <span>Welcome, {user.name}</span>
      </div>
      <button
        className={styles.logoutButton}
        onClick={handleLogout}
        aria-label="Logout"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
