import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import HomePage from './pages/HomePage/HomePage';
import RegistrationForm from './pages/RegistrationForm/RegistrationForm';
import LoginForm from './pages/LoginForm/LoginForm';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(state => state.auth.isRefreshing);
  const token = useSelector(state => state.auth.token);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(refreshUser(token));
    }
  }, [dispatch, token, isLoggedIn]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            {isRefreshing ? (
              <p>Loading...</p>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<RestrictedRoute />}>
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route path="/login" element={<LoginForm />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/contacts" element={<ContactsPage />} />
                </Route>
              </Routes>
            )}
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
