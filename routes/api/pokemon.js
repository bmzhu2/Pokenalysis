const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Pokemon = require('../../models/Pokemon');

router.get('/team/:team_id', (req, res) => {
  Pokemon.find({ team: req.params.team_id })
    .then(pokemon => res.json(pokemon))
    .catch(err =>
      res.status(404).json({ nopokemonfound: 'No pokemon found on that team' }
      )
    );
});

router.get('/:id', (req, res) => {
  Pokemon.findById(req.params.id)
    .then(pokemon => res.json(pokemon))
    .catch(err =>
      res.status(404).json({ nopokemonfound: 'No pokemon found with that ID' })
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newPokemon = new Pokemon({
      pokeId: req.body.text,
      team: req.body.teamId,
      move1: req.body.move1,
      move2: req.body.move2,
      move3: req.body.move3,
      move4: req.body.move4,
      itemId: req.body.itemId,
      ability: req.body.ability,
      nature: req.body.nature
    });

    newPokemon.save().then(pokemon => res.json(pokemon));
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Pokemon.findById(req.params.id)
      .then(pokemon => {
        pokemon.pokeId = req.body.text;
        pokemon.team = req.body.team_id;
        pokemon.move1 = req.body.move1;
        pokemon.move2 = req.body.move2;
        pokemon.move3 = req.body.move3;
        pokemon.move4 = req.body.move4;
        pokemon.itemId = req.body.itemId;
        pokemon.ability = req.body.ability;
        pokemon.nature = req.body.nature;
        pokemon.save().then(pokemon => res.json(pokemon));
      })
      .catch(err =>
        res.status(404).json({ nopokemonfound: 'No pokemon found with that ID' })
      );
  }
);

module.exports = router;