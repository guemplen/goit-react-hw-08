import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { fetchContacts } from '../../redux/contactsOps';
import { deleteContact } from '../../redux/contactsOps';
import styles from './ContactList.module.css';
import ContactItem from '../Contact/Contact';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ContactList;
