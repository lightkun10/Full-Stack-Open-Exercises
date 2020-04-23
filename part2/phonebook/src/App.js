import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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

  // Filter for person names
  const filterShow = !searchTerm
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))


  console.log(persons)


  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={searchTerm} onChange={handleFilterChange} />

      <h2>add a new</h2>
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

      <h3>Numbers</h3>
      {/* Add each person name */}
      {filterShow.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App;
