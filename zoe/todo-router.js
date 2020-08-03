const express = require('express');
const Exercise = require('./exercise-model.js');
const router = express.Router();
const restricted = require("../restricted-middleware.js");

router.get('/', restricted, (req, res) => {
    Exercise.findExercise()
  .then(Exercise => {
      const mExercise= Exercise.map((exer)=>exer.completed===0?{...exer,completed:false}:{...exer,completed:true})
    res.json(mExercise);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get the exercises' });
  });
}); 

router.get('/:id', restricted, (req, res) => {

    const id = req.params.id;

    Exercise.findById(id)
  .then(Exercise => {
    res.json(Exercise);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get the exercise' });
  });
}); 

router.post('/', restricted, (req, res) => {
  const eData = req.body;

  Exercise.addExercise(eData)
  .then(exercise => {
    res.status(201).json(exercise);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new exercise' });
  });
});  

router.put('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Exercise.findById(id)
    .then(exercise => {
      if (exercise) {
        Exercise.updateExercise(changes, id)
        .then(updatedExercise => {
          res.json(updatedExercise);
        });
      } else {
        res.status(404).json({ message: 'Could not find the exercise with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update the exercise' });
    });
  });
  
router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Exercise.removeExercise(id)
    .then(deleted => {
        if (deleted) {
        res.json({ removed: deleted });
        } else {
        res.status(404).json({ message: 'Could not find exercise with given id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete exercise' });
    });
});

module.exports = router;