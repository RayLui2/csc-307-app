import React from 'react'
import Table from './Table'

/* creating array of objects to pass data down to children */
const characters = [
  {
    name: 'Charlie',
    job: 'Janitor',
  },
  {
    name: 'Mac',
    job: 'Bouncer',
  },
  {
    name: 'Dee',
    job: 'Aspring actress',
  },
  {
    name: 'Dennis',
    job: 'Bartender',
  },
]

function MyApp() {
  return (
    /* container is a style defined in React */
    /* passing data in to child through a property "chatacterData" */
    <div className="container">
      <Table characterData={characters} />
    </div>
  )
}

export default MyApp
