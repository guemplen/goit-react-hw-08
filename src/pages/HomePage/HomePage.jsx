import styles from './homePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Contact Book App!</h1>
      <p>
        This application allows you to manage your contacts efficiently and
        securely.
      </p>
      <p>
        Feel free to explore the features such as adding new contacts, viewing
        existing contacts, and deleting contacts.
      </p>
    </div>
  );
};

export default HomePage;
