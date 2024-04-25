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

app.use(cors())
app.use(express.json())

app.delete('/users/:id', (req, res) => {
  const id = req.params['id']
  userService.DeleteUserById(id).then((deleted_user) => {
    if (deleted_user) res.status(201).send(deleted_user)
    else res.status(404).send('Resource not found.')
  })
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
