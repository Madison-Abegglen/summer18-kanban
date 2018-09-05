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

module.exports = router