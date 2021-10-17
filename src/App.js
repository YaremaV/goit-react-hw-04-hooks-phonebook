import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ContactsList from './components/Contactslist/Contactslist';
import initialContacts from './contacts.json';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import Layout from './components/Layout/Layout';
import Modal from './components/Modal';

class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    contacts: initialContacts,
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App ComponentDidMount');
    const getCont = localStorage.getItem('contacts');
    const parsedCont = JSON.parse(getCont);

    if (parsedCont) {
      this.setState({ getCont: parsedCont });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('ComponentDidUpdate APP');
    if (this.state.contacts !== prevState.contacts) {
      console.log('update');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = (name, number) => {
    const { contacts } = this.state;
    const value = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(({ name }) => name.toLowerCase() === value.name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({ contacts: [value, ...contacts] }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterCase),
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    console.log('App render');

    const { filter, showModal } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Layout>
        <button type="button" onClick={this.toggleModal}>
          Open Phonebook
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <Form onSubmit={this.addContacts} />
          </Modal>
        )}

        <Filter value={filter} onHandleFilter={this.changeFilter} />

        <ContactsList
          contacts={filteredContacts}
          onDeleteContacts={this.deleteContact}
        />
      </Layout>
    );
  }
}

export default App;
