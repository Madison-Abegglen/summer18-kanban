const router = require('express').Router()
const Collection = require('../models/task')

router.get('/:listId', (req, res, next) =>
  Collection.find({ listId: req.params.listId })
    .then(item => res.send(item))
    .catch(next)
)

router.post('/', (req, res, next) =>
  Collection.create(req.body)
    .then(item => res.send(item))
    .catch(next)
)

router.put('/:id', (req, res, next) =>
  Collection.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send({ message: 'Successfully updated item.' }))
    .catch(next)
)

router.delete('/:id', (req, res, next) =>
  Collection.findByIdAndRemove(req.params.id)
    .then(() => res.send({ message: 'Successfully deleted item.' }))
    .catch(next)
)

router.get('/comments/:taskId', (req, res, next) =>
  Collection.find({ taskId: req.params.taskId })
    .then(item => res.send(item.comments))
    .catch(next)
)

router.post('/comments/:taskId', (req, res, next) =>
  Collection.findById(req.params.id)
    .then(item => {
      item.comments.push(req.body)
      const comment = item.comments[item.comments.length - 1]
      item.save(err => {
        if (err) {
          return next(err)
        }
        res.send(comment)
      })
    })
)

router.delete('/comments/:taskId/:commentId', (req, res, next) =>
  Collection.findById(req.params.taskId)
    .then(task => {
      task.comments.find(comment => comment._id === commentId)
    })
)

module.exports = router