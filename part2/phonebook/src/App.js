import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const hook = () => {
    console.log('effect start')

    axios.get('http://localhost:3001/persons')
      .then((response) => {
        console.log("promise fulfilled")
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    // setPersons(persons.concat(personObject))

    const findPerson = persons.find((person) => person.name === newName);

    if (findPerson) {
      alert(`${personObject['name']} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  // Filter for person names
  const filteredResult = !searchTerm
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      {/* Add each person name */}
      <Persons filteredResult={filteredResult} />

    </div>
  )
}

export default App;
