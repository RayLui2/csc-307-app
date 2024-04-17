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
        // if response code is good
        if (response.status === 201) {
          // Parse response body as JSON
          return response.json()
        } else {
          throw new Error(`Failed to add user. Status: ${response.status}`)
        }
      })
      // addeduser is the response json
      .then((addedUser) => {
        // Update state with the newly added user (including the generated id)
        setCharacters([...characters, addedUser])
      })
      // our safety net
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
