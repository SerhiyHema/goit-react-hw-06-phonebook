import styles from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactSlice';

export const ContactList = () => {
  const users = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();
  const contacts = useSelector(state => {
    return state.contacts.items.filter(item =>
      item.name.toLowerCase().trim().includes(state.filter.toLowerCase().trim())
    );
  });

  return (
    <>
      <h3>Your phonebook has {users.length} contacts</h3>
      {contacts.length > 0 ? (
        <h3>contacts found {contacts.length} </h3>
      ) : (
        <h3>Contact not found</h3>
      )}
      <ul className={styles.list__box}>
        {contacts.map(item => (
          <li key={item.id} className={styles.list}>
            <p>
              <b>{item.name}</b> {item.number}
            </p>
            <button
              type="button"
              onClick={() => dispatch(deleteContact(item.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
