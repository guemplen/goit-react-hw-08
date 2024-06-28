import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import Layout from './components/Layout/Layout';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/contacts"
            element={
              isLoggedIn ? <ContactsPage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
