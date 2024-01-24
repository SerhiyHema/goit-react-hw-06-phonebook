import { createSlice, nanoid } from '@reduxjs/toolkit';
import contactsBook from '../data/contacts.json';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  items: contactsBook,
};

const contactSlice = createSlice({
  name: 'contact',
   initialState,
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        state.items.push(payload);
      },

      prepare: (newContact) => {
        const id = nanoid();
        return {
          payload: { id: id, ...newContact }
        };
      },
    },
    deleteContact: (state, { payload }) => {
      state.items = state.items.filter(contact => contact.id !== payload);
    },
  },
  
});


export const { addContact, deleteContact } = contactSlice.actions;
export default persistReducer({ key: 'contacts', storage }, contactSlice.reducer);