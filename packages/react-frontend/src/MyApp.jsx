// src/MyApp.jsx
import React, { useState, useEffect } from 'react'
import Table from './Table'
import Form from './Form'

function MyApp() {
  const [characters, setCharacters] = useState([])

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index
    })
    setCharacters(updated)
  }
  function updateList(person) {
    setCharacters([...characters, person])
  }

  function postUser(person) {
    const promise = fetch('Http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })

    return promise
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        // Successful insertion (201 Created)
        if (response.status === 201) {
          // Update state with the new person
          setCharacters([...characters, person])
        }
        // Handle other status codes if needed
        else {
          console.log(`Failed to add user. Status: ${response.status}`)
        }
      })
      // our safety net for unexpected errors
      .catch((error) => {
        console.error('Error adding user:', error)
      })
  }

  function fetchUsers() {
    const promise = fetch('http://localhost:8000/users')
    return promise
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json['users_list']))
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp
