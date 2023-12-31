const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = 8080;
const cors = require("cors");
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors({
    origin: '*'
}));

app.use(express.json())

//home page message, not actually used
app.get('/' , (req, res) => {
  res.status(200).json("Welcome!")
})

//retrieves the entire item list
app.get('/inventory' , (req, res) => {
  knex('inventory')
    .select('*')
    .then(data => res.status(200).json(data))
})

//gets all users, only used for testing...i think
app.get('/users' , (req, res) => {
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
})

//if username is available, posts a new user to the DB
app.post('/register', (req,res) => {
  const newUser = req.body;
  const tempPass = newUser.password;
  let failMessage = {};
  let failure = false;

  bcrypt.hash(tempPass, saltRounds)
    .then(data => {newUser.password = data})
    .then(async data => {
      await knex('users')
        .count('username')
        .where('username', newUser.username)
        .then(data => {
          if(data[0].count > 0) {
            failure = true;
            failMessage.username = 'Username Taken!'
          }
        });
    })
    .then(data => {
      data = failMessage;
      if(failure) {
        return res.status(400).send(data)
      } else {
        knex('users')
          .insert(newUser)
          .then(data => res.status(201).send("Success! Thank you for registering!"))
      }
    })
})


//used to check username and password to login and create a client side state "token". I know...super *secure*
app.post('/login', (req,res) => {
  const username = req.body.username
  const password = req.body.password
  knex('users')
    .count('username')
    .where('username', username)
    .then(async data => {
      if(data[0].count === '1') {
       await knex('users')
          .select('password')
          .where('username', username)
          .then(data => {
            bcrypt.compare(`${password}`, `${data[0].password}`).then(function(result) {
              if(result) {
                knex('users')
                  .select('id')
                  .where('username', username)
                  .then(data => res.status(200).json({'username': username, 'user_id': data[0].id}))
              } else {
                res.status(400).json('Wrong Password!')
              }
            });
          })
      } else {
        res.status(400).json('Username Not Found!')
      }
    })
})

//retrieves a single item from the db
app.get('/inventory/:id', (req,res) => {
  let id = req.params.id
  knex('inventory')
    .select('*')
    .where('id', id)
    .then(data => res.status(200).json(data))
})

//edit and update the specific item
app.patch('/inventory/:id', (req,res) => {
  let id = req.params.id
  const updatedItem = req.body;
  knex('inventory')
    .where('id', id)
    .update(updatedItem)
    .then(data => res.status(200).json('Updated!'))
})

//deletes the specific item from the DB
app.delete('/inventory/:id', (req,res) => {
  let id = req.params.id
  knex('inventory')
    .where('id', id)
    .del()
    .then(data => res.status(200).json('Deleted!'))
})

//adds a new item to the db
app.post('/inventory', (req,res) => {
  const newItem = req.body;
  knex('inventory')
    .insert(newItem)
    .then(data => res.status(200).json('Posted!'))
})

//retrieves the item list specific to the user logged in
app.get('/userinventory/:id', (req,res) => {
  let id = req.params.id
  knex('inventory')
    .select('*')
    .where('user_id', id)
    .then(data => res.status(200).json(data))
})


//used to check the token username against the database
app.post('/logcheck', (req,res) => {
  knex('users')
    .count('*')
    .where('username', req.body.username)
    .then(data => {
      if(data[0].count === '1') {
        res.status(200).send({check: 'good'})
      } else {
        res.status(400).send({check: 'bad'})
      }
    })
})


//checks that the username isnt taken during registration
app.post('/usercheck', (req,res) => {
  const username = req.body.username
  knex('users')
  .count('*')
  .where('username', username)
  .then(data => {
    if(data[0].count > 0) {
      res.status(400).send({check: 'bad'})
    } else {
        res.status(200).send({check: 'good'})
      }
    })
})

//catches any url requests the don't exist
app.all('*', (req,res) => {
  res.status(400).json('Page does not exist!')
})

//the port the server listens on
app.listen(port, () => console.log(`You are now listening live at http://localhost:${port}!`))