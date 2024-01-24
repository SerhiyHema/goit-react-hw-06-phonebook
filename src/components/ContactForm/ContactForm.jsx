import styles from './ContactForm.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyOptions = {
  position: 'top-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.contacts);

  const handleSubmit = e => {
    e.preventDefault();
    const number = e.target.elements.number.value;
    const name = e.target.elements.name.value;

    const validInput = items.some(function (element) {
      return (
        element.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        element.number.trim() === number.trim()
      );
    });

    const newObj = {
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
    };

    validInput
      ? toast.info(
          `${name} or phone ${number}: is already in contacts `,
          notifyOptions
        )
      : dispatch(addContact(newObj));

    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <input placeholder="Name" type="text" name="name" required />
        </label>

        <label>
          <input placeholder="Phone number" type="tel" name="number" required />
        </label>

        <button type="submit">Add Contact</button>
      </form>
      <ToastContainer />
    </>
  );
};
