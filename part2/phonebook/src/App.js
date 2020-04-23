import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
    }

    // setPersons(persons.concat(personObject))

    const findPerson = persons.find((person) => person.name === newName);

    if (findPerson) {
      alert(`${personObject['name']} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }

  }

  console.log(persons)


  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          <button value={newName} type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {/* Add each person name */}
      {persons.map(person =>
        <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App;
