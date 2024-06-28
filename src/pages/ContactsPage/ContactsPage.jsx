import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../redux/contacts/operations';
import styles from './contactsPage.module.css';
import ContactItem from '../../components/Contact/Contact';

const ContactPage = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleAddContact = e => {
    e.preventDefault();
    if (!name || !number) return;
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleAddContact}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Phone number</label>
          <input
            type="text"
            name="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
      <ul className={styles.list}>
        {contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactPage;
