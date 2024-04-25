// backend.js
import express from 'express'
import cors from 'cors'

import userService from './services/user-service.js'

const app = express()
const port = 8000

const generateRandomId = () => {
  // Generate a random alphanumeric ID
  const randomId = Math.random().toString(36).substring(3, 9)
  return randomId
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

app.use(cors())
app.use(express.json())

app.delete('/users/:id', (req, res) => {
  const id = req.params['id']
  const deleted_user = deleteUserById(id)
  // if we successfully deleted a user
  if (deleted_user) {
    // this response indicates delete was successful
    res.status(204).send()
  }
  // could not find the ID of the user to delete
  else {
    res.status(404).send('Resource not found.')
  }
})

app.post('/users', (req, res) => {
  const userToAdd = req.body
  userService.addUser(userToAdd).then((user) => {
    if (user) res.status(201).send(user)
    else res.status(500).end()
  })
})

app.get('/users/:id', (req, res) => {
  const id = req.params['id'] //or req.params.id
  userService.findUserById(id).then((result) => {
    if (result === undefined || result == null)
      res.status(404).send('Resource not found.')
    else res.send({ users_list: result })
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
  const name = req.query.name
  const job = req.query.job
  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('An error ocurred in the server.')
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
