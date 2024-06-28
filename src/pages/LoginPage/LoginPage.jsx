import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../redux/auth/operations';
import styles from './loginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate('/contacts');
        setSubmitting(false);
        resetForm();
      })
      .catch(error => {
        console.error('Login failed:', error);
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.loginBox}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              className={errors.email && touched.email ? styles.errorInput : ''}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMsg}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              className={
                errors.password && touched.password ? styles.errorInput : ''
              }
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMsg}
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
