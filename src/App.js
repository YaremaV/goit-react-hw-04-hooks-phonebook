import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactsList from './components/Contactslist/Contactslist';
import initialContacts from './contacts.json';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import Layout from './components/Layout/Layout';

export default function App() {
  const [contacts, setContacts] = useState(
    initialContacts,
    // () =>
    //   JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts,
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
      : setContacts([...contacts, newContact]);
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
// class App extends Component {
//   state = {
//     contacts: initialContacts,
//     filter: '',
//     showModal: false,
//   };

//   componentDidMount() {
//     console.log('App ComponentDidMount');
//     const getCont = localStorage.getItem('contacts');
//     const parsedCont = JSON.parse(getCont);

//     if (parsedCont) {
//       this.setState({ getCont: parsedCont });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log('ComponentDidUpdate APP');
//     if (this.state.contacts !== prevState.contacts) {
//       console.log('update');
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContacts = (name, number) => {
//     const { contacts } = this.state;
//     const value = {
//       id: uuidv4(),
//       name,
//       number,
//     };

//     contacts.some(({ name }) => name.toLowerCase() === value.name.toLowerCase())
//       ? alert(`${name} is already in contacts`)
//       : this.setState(({ contacts }) => ({ contacts: [value, ...contacts] }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const filterCase = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filterCase),
//     );
//   };

//   render() {
//     console.log('App render');

//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();

//     return (
//       <Layout>
//         <Form onSubmit={this.addContacts} />
//         <button type="button" onClick={this.toggleModal}>
//           Open Phonebook
//         </button>

//         <Filter value={filter} onHandleFilter={this.changeFilter} />

//         <ContactsList
//           contacts={filteredContacts}
//           onDeleteContacts={this.deleteContact}
//         />
//       </Layout>
//     );
//   }
// }

// export default App;
