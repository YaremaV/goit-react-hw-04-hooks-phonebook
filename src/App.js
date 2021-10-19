import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactsList from './components/Contactslist/Contactslist';
import initialContacts from './contacts.json';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import Layout from './components/Layout/Layout';

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts,
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('qweqweqw');
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = newContact => {
    const normValue = newContact.name.toLowerCase();
    newContact.id = uuidv4();

    contacts.some(({ name }) => name.toLowerCase() === normValue)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts([newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const filterCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterCase),
    );
  };

  return (
    <Layout>
      <Form onSubmit={addContacts} />
      <Filter value={filter} onHandleFilter={changeFilter} />
      <ContactsList
        contacts={getFilteredContacts()}
        onDeleteContacts={deleteContact}
      />
    </Layout>
  );
}
