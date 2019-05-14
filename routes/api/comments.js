const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comments');

router.get('team/:team_id', (req, res) => {
  Comment.find({ team: req.params.team_id })
    .then(comments => res.json(comments))
    .catch(err => 
      res.state(404).json({ nocommentsfound: 'No comments found from that team' })
    );
})

router.get('/user/:username', (req, res) => {
  Comment.find({ username: req.params.username })
    .then(comments => res.json(comments))
    .catch(err =>
      res.status(404).json({ nocommentsfound: 'No comments found from that user' }
      )
    );
});

router.get('/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err =>
      res.status(404).json({ nocommentfound: 'No comment found with that ID' })
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newComment = new Comment({
      text: req.body.text,
      team: req.body.teamId,
      user: req.user.id,
      username: req.user.username
    });

    newComment.save().then(comment => res.json(comment));
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Comment.findById(req.params.id)
      .then(comment => {
        comment.text = req.body.text
        comment.save().then(comment => res.json(comment));
      })
      .catch(err =>
        res.status(404).json({ nocommentfound: 'No comment found with that ID' })
      );
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findById(req.params.id)
      .then(comment => {
        comment.delete().then(() => res.json(req.params.id));
      })
      .catch(err =>
        res.status(404).json({ nocommentfound: 'No comment found with that ID' })
      );
  }
);

module.exports = router;