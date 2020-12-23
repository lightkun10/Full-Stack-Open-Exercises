import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Filter from './components/Filter';
import Form from './components/Form';
import Result from './components/Result';
import numberService from './services/numbers';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  
  // Control the form input element
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const eventHandler = (initialNotes) => {
      console.log('promise fulfilled');
      setPersons(initialNotes);
    }

    const errorHandler = (error) => {
      console.log('Promise rejected');
      alert(error);
    }

    numberService.getAll()
      .then(eventHandler)
      .catch(errorHandler);
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = { 
      name: newName,
      number: newNumber, 
    };

    // Check if the same name already exist
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      numberService
        .create(personObject)
        .then((returnedNumber) => {
          setPersons(persons.concat(returnedNumber));
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.log('Promise rejected');
          alert(error);
        });
    }
  }

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      console.log(`deleting ${person.name}...`);

      numberService.deleteNumber(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => console.log('An error occured', error));
    }
  }

  // Filter for person names
  const filtered = !searchTerm 
    ? persons 
    : persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <Header text='Phonebook' />

      <Filter searchTerm={searchTerm} handleFilterChange={handleFilterChange} />

      <Form
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Result filtered={filtered} deletePerson={deletePerson} />
    </div>
  )
}

export default App