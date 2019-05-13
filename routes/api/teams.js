const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Team = require('../../models/Team');
const validateTeamInput = require('../../validation/teams');

router.get('/', (req, res) => {
  Team.find()
    .sort({ date: -1 })
    .then(teams => res.json(teams))
    .catch(err => res.status(404).json({ noteamsfound: 'No teams found' }));
});


router.get('/user/:user_id', (req, res) => {
  Team.find({ user: req.params.user_id })
    .then(teams => res.json(teams))
    .catch(err =>
      res.status(404).json({ noteamsfound: 'No teams found from that user' }
      )
    );
});

router.get('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team => res.json(team))
    .catch(err =>
      res.status(404).json({ noteamfound: 'No team found with that ID' })
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTeamInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTeam = new Team({
      name: req.body.name,
      user: req.user.id
    });

    for (let i = 0; i < array.length; i++) {
      newTeam.pokemon[i] = req.body.pokemon[i]
    }

    newTeam.save().then(team => res.json(team));
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTeamInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Team.findById(req.params.id)
      .then(team => {
        team.name = req.body.name;
        for (let i = 0; i < 6; i++) {
          newTeam.pokemon[i] = req.body.pokemon[i]
        }
        team.save().then(team => res.json(team));
      })
      .catch(err =>
        res.status(404).json({ noteamfound: 'No team found with that ID' })
      );
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Team.findById(req.params.id)
      .then(team => {
        team.delete().then(() => res.json(req.params.id));
      })
      .catch(err =>
        res.status(404).json({ noteamfound: 'No team found with that ID' })
      );
  }
);

module.exports = router;