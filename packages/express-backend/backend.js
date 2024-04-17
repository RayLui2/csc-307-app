// backend.js
import express from 'express'
import cors from 'cors'

const app = express()
const port = 8000
const users = {
  users_list: [
    {
      id: 'xyz789',
      name: 'Charlie',
      job: 'Janitor',
    },
    {
      id: 'abc123',
      name: 'Mac',
      job: 'Bouncer',
    },
    {
      id: 'ppp222',
      name: 'Mac',
      job: 'Professor',
    },
    {
      id: 'yat999',
      name: 'Dee',
      job: 'Aspring actress',
    },
    {
      id: 'zap555',
      name: 'Dennis',
      job: 'Bartender',
    },
  ],
}

const findUserByName = (name) => {
  return users['users_list'].filter((user) => user['name'] === name)
}

const findUserByJob = (job) => {
  return users['users_list'].filter((user) => user['job'] === job)
}

const findUserById = (id) =>
  users['users_list'].find((user) => user['id'] === id)

const addUser = (user) => {
  users['users_list'].push(user)
  return user
}

const deleteUserById = (id) => {
  // Find specific user by ID in users
  const userToDel = users.users_list.find((user) => user.id === id)
  // Check if the user exists
  if (userToDel) {
    // Get the index of user from users_list
    const index = users.users_list.indexOf(userToDel)
    // Remove the user: starts at index, removes 1 from there(the user)
    if (index !== -1) {
      users.users_list.splice(index, 1)
      return true
    }
  }
  // no user with specified ID was found
  return false
}

const findUserByNameandJob = (name, job) => {
  return users['users_list'].filter(
    (user) => user['name'] === name && user['job'] === job
  )
}

app.use(cors())
app.use(express.json())

app.delete('/users/:id', (req, res) => {
  const id = req.params['id']
  const deleted_user = deleteUserById(id)
  // if we successfully deleted a user
  if (deleted_user) {
    // this response indicates delete was successful
    res.status(204).end()
  }
  // could not find the ID of the user to delete
  else {
    res.status(404).send('Resource not found.')
  }
})

app.post('/users', (req, res) => {
  const userToAdd = req.body
  addUser(userToAdd)
  res.status(201).send('Content Created')
})

app.get('/users/:id', (req, res) => {
  const id = req.params['id'] //or req.params.id
  let result = findUserById(id)
  if (result === undefined) {
    res.status(404).send('Resource not found.')
  } else {
    res.send(result)
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
  const name = req.query.name
  const job = req.query.job
  // if we can't find any specific name and job, send all the users
  if (name === undefined && job === undefined) {
    res.send(users)
  }
  // found a name but no job
  else if (name && !job) {
    let result = findUserByName(name)
    result = { users_list: result }
    res.send(result)
  }
  // found a job but no name
  else if (job && !name) {
    let result = findUserByJob(job)
    result = { users_list: result }
    res.send(result)
  }
  // found both a name and a job
  else {
    let result = findUserByNameandJob(name, job)
    result = { users_list: result }
    res.send(result)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
