const express = require('express');
const Todo = require('./todo-model.js');
const router = express.Router();
const restricted = require("../restricted-middleware.js");

router.get('/', restricted, (req, res) => {
    Todo.findTodo()
  .then(Todo => {
      const mTodo= Todo.map((exer)=>exer.completed===0?{...exer,completed:false}:{...exer,completed:true})
    res.json(mTodo);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get the Todos' });
  });
}); 

router.get('/:id', restricted, (req, res) => {

    const id = req.params.id;

    Todo.findById(id)
  .then(Todo => {
    res.json(Todo);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get the todo' });
  });
}); 

router.post('/', restricted, (req, res) => {
  const eData = req.body;

  Todo.addTodo(eData)
  .then(todo => {
    res.status(201).json(todo);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new todo' });
  });
});  

router.put('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Todo.findById(id)
    .then(todo => {
      if (todo) {
        Todo.updateTodo(changes, id)
        .then(updatedTodo => {
          res.json(updatedTodo);
        });
      } else {
        res.status(404).json({ message: 'Could not find the todo with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update the todo' });
    });
  });
  
router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Todo.removeTodo(id)
    .then(deleted => {
        if (deleted) {
        res.json({ removed: deleted });
        } else {
        res.status(404).json({ message: 'Could not find todo with given id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete todo' });
    });
});

module.exports = router;