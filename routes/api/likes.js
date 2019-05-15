const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Like = require('../../models/Like');

router.get('/user/:username', (req, res) => {
  Like.find({ username: req.params.username })
    .then(likes => res.json(likes))
    .catch(err =>
      res.status(404).json({ nolikesfound: 'No teams liked by that user' }
      )
    );
});

router.get('/team/:team_id', (req, res) => {
  Like.find({ team: req.params.team_id })
    .then(likes => res.json(likes))
    .catch(err =>
      res.status(404).json({ nolikesfound: 'That team currently has no likes' })
    );
});

router.get('/', (req, res) => {
  Like.find()
  .then(likes => res.json(likes))
  .catch(err => res.status(404).json({ nolikesfound: 'No likes found' }))
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newLike = new Like({
      team: req.body.teamId,
      user: req.user.id,
      username: req.user.username
    });
    newLike.save().then(like => res.json(like));
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Like.findById(req.params.id)
      .then(like => {
        like.delete().then(() => res.json(req.params.id));
      })
      .catch(err =>
        res.status(404).json({ nolikefound: 'No like found with that ID' })
      );
  }
);

module.exports = router;