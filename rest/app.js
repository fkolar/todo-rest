import db from './db';
import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: '*'
}));


// get all todos
app.get('/api/todos', (req, res) => {

  console.log('get all todos: ', req);
  res.status(200).send(db)

});


app.post('/api/todos', (req, res) => {
  console.log('create todo: ', req);

  if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const todo = {
    id: db.length + 1,
    description: req.body.description
  }
  db.push(todo);
  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    todo
  })
});


app.get('/api/todos/:id', (req, res) => {
  console.log('get todo by Id: ', req);

  const id = parseInt(req.params.id, 10);
  db.map((todo) => {
    if (todo.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        data: todo,
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: 'todo does not exist',
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});


