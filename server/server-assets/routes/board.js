const router = require('express').Router()
const Boards = require('../models/board')

// GET
router.get('/', (req, res, next) => {
  Boards.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(error => {
      console.log('[BOARD ERROR]', error)
      next(error)
    })
})

// POST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Boards.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(error => {
      console.log('[BOARD ERROR]', error)
      next(error)
    })
})

// PUT
router.put('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send({ error: 'ACCESS DENIED!' })
      }
      board.update(req.body, (error) => {
        if (error) {
          console.log('[BOARD ERROR]', error)
          return next(error)
        }
        res.send({ message: 'Successfully Updated' })
      });
    })
    .catch(error => {
      console.log('[BOARD ERROR]', error)
      next(error)
    })
})

// DELETE
router.delete('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send({ error: 'ACCESS DENIED!' })
      }
      board.remove(req.body, (error) => {
        if (error) {
          console.log('[BOARD ERROR]', error)
          return next(error)
        }
        res.send({ message: 'Successfully DELORTED' })
      });
    })
})


module.exports = router