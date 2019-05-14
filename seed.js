let seeder = require('mongoose-seed');
require('./models/User')
require('./models/Team')
require('./models/Comment')
const db = require('./config/keys').mongoURI;

seeder.connect(db, { useNewUrlParser: true }, function(){
    seeder.loadModels([
        './models/User.js'
    ])

    seeder.clearModels(['users'], function () {
        seeder.populateModels(dataUsers, function () {
            seeder.disconnect();
        });
    });

    seeder.loadModels([
        './models/Team.js'
    ])

    seeder.clearModels(['team'], function () {
        seeder.populateModels(dataTeams, function () {
            seeder.disconnect();
        });
    });

    seeder.loadModels([
        './models/Comment.js'
    ])

    seeder.clearModels(['comment'], function () {
        seeder.populateModels(dataComments, function () {
            seeder.disconnect();
        });
    });
})

const dataUsers = [
    {
        'model': 'users',
        'documents': [
            {
                'username': 'Banana',
                'password': 'ElliotIsCool',
                'id': '41224d776a326fb40f000001'
            },
            {
                'username': 'Zinnia',
                'password': 'GetSalaMinced',
                'id': '41224d776a326fb40f000000'
            }
        ]
    }
]

const dataTeams = [
    {
        'model': 'team',
        'documents': [
            {
                'name': 'dragon',
                'pokemon': [
                    {
                        'pokeId': 10089,
                        'move1': 'dragon-claw',
                        'move2': 'crunch',
                        'move3': 'fire fang',
                        'move4': 'thunder fang',
                        'item': 'salamencite',
                        'ability': 'aerilate'
                    },
                    {
                        'pokeId': 334,
                        'move1': 'dragon-pulse',
                        'move2': 'flamethrower',
                        'move3': 'moonblast',
                        'move4': 'hyper voice',
                        'ability': 'natural-cure'
                    },
                    {
                        'pokeId': 697,
                        'move1': 'dragon claw',
                        'move2': 'crunch',
                        'move3': 'eartchquake',
                        'move4': 'stone-edge',
                        'ability': 'strong-jaw'
                    }
                ],
                'user': '41224d776a326fb40f000000'
            },
            {
                'name': 'champion',
                'pokemon': [
                    {
                        'pokeId': 448,
                        'move1': 'aura-sphere',
                        'move2': 'dragon-pulse',
                        'move3': 'psychic',
                        'move4': 'earthquake',
                        'ability': 'steadfast'
                    },
                    {
                        'pokeId': 350,
                        'move1': 'surf',
                        'move2': 'ice-beam',
                        'move3': 'mirror-coat',
                        'move4': 'aqua-ring',
                        'ability': 'marvel-scale'
                    },
                    {
                        'pokeId': 445,
                        'move1': 'dragon-rush',
                        'move2': 'brick-break',
                        'move3': 'eartchquake',
                        'move4': 'giga-impact',
                        'ability': 'sand-veil'
                    }
                ],
                'user': '41224d776a326fb40f000001',
                'id': '41224d776a326fb40f000002'
            }
        ]
    }
]

const dataComments = [
    {
        'model': 'comment',
        'documents': [
            {
                'team': '41224d776a326fb40f000002',
                'user': '41224d776a326fb40f000000',
                'text': 'Garchomp is OP'
            }
        ]
    }
]