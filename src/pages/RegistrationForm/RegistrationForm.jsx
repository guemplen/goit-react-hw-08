import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/operations';
import styles from './registrationPage.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        setSubmitting(false);
        navigate('/');
      })
      .catch(error => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className={errors.name && touched.name ? styles.errorInput : ''}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMsg}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
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
              id="password"
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
          <button className={styles.button} type="submit">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
