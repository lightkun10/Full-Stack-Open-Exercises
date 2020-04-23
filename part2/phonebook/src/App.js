import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
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

  // console.log(persons)


  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {/* Add each person name */}
      {persons.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App;
