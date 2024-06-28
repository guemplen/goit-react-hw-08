import { FaUser, FaPhone } from 'react-icons/fa';
import styles from './contact.module.css';

const ContactItem = ({ contact, onDelete }) => {
  const handleDelete = () => {
    onDelete(contact.id);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contactHeader}>
        <FaUser className={styles.icon} />
        <span>{contact.name}</span>
      </div>
      <div className={styles.contactBody}>
        <FaPhone className={styles.icon} />
        <span>{contact.number}</span>
      </div>
      <div className={styles.deleteButtonContainer}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
