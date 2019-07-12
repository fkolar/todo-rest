import db from './db';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(cors({
  origin: '*'
}));


app.use(bodyParser.json());




// get all todos
app.get('/api/todos', (req, res) => {

  console.log('get all todos: ', req);
  res.status(200).send(db)

});


// get all todos by completed
app.get('/api/todos/q', (req, res) => {
  console.log('get todos. Completed:', req.query['completed']);

  const isCompleted = req.query['completed'] == 'true' ? true : false;
  res.status(200).send(db.filter((todo) => isCompleted ? todo.completed : !todo.completed))

});


app.post('/api/todos', (req, res) => {
  console.log('POST : ', req.body);

  if (!req.body) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const todo = {
    id: db.length + 1,
    description: req.body.description,
    completed: req.body.completed
  }
  db.push(todo)
  return res.status(201).send(todo);
});


app.put('/api/todos/:id', (req, res) => {
  let todo = db.filter((item) => item.id === parseInt(req.param("id")))[0];
  todo.completed = !todo.completed;
  return res.status(201).send(todo);
});


app.get('/api/todos/:id', (req, res) => {
  console.log('get todo by Id: ', req);

  const id = parseInt(req.params.id, 10);
  db.map((todo) => {
    if (todo.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        data: todo
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


