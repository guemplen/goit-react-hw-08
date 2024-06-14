import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    number: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be at most 50 characters')
      .required('Name is required'),
    number: Yup.string()
      .min(3, 'Phone number must be at least 3 characters')
      .max(15, 'Phone number must be at most 15 characters')
      .required('Phone number is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    const newContactData = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContactData));
    resetForm();
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
            <label htmlFor="number">Phone</label>
            <Field
              type="text"
              id="number"
              name="number"
              className={
                errors.number && touched.number ? styles.errorInput : ''
              }
            />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.errorMsg}
            />
          </div>
          <button type="submit">Add Contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
