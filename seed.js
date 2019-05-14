let seeder = require('mongoose-seed');
const User = require('./models/User')
const Team = require('./models/Team')
const Comment = require('./models/Comment')
const db = require('./config/keys_prod').mongoURI;
const bcrypt = require('bcryptjs');

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

let passwords = ['ElliotIsCool', 'GetPsyched', 'XYted', 'GetSalaMinced'];
const newPasswords = []
let salt
let hash

passwords.forEach(password => {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt)
    newPasswords.push(hash)
})

const dataUsers = [
    {
        'model': 'users',
        'documents': [
            {
                'username': 'Banana',
                'password': newPasswords[0],
                '_id': '41224d776a326fb40f000001'
            },
            {
                'username': 'Sabrina',
                'password': newPasswords[1],
                '_id': '41224d776a326fb40f000010'
            },
            {
                'username': 'Diantha',
                'password': newPasswords[2],
                '_id': '41224d776a326fb40f000020'
            },
            {
                'username': 'Zinnia',
                'password': newPasswords[3],
                '_id': '41224d776a326fb40f000000'
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
                        'name': 'salamence-mega',
                        'move1': 'dragon-claw',
                        'move2': 'crunch',
                        'move3': 'fire fang',
                        'move4': 'thunder fang',
                        'item': 'salamencite',
                        'ability': 'aerilate'
                    },
                    {
                        'pokeId': 334,
                        'name': 'altaria',
                        'move1': 'dragon-pulse',
                        'move2': 'flamethrower',
                        'move3': 'moonblast',
                        'move4': 'hyper voice',
                        'ability': 'natural-cure'
                    },
                    {
                        'pokeId': 697,
                        'name': 'tyrantrum',
                        'move1': 'dragon claw',
                        'move2': 'crunch',
                        'move3': 'eartchquake',
                        'move4': 'stone-edge',
                        'ability': 'strong-jaw'
                    }
                ],
                'user': '41224d776a326fb40f000000',
                'username': 'Zinnia',
                '_id': '41224d776a326fb40f000030'
            },
            {
                'name': 'champion',
                'pokemon': [
                    {
                        'pokeId': 448,
                        'name': 'lucario',
                        'move1': 'aura-sphere',
                        'move2': 'dragon-pulse',
                        'move3': 'psychic',
                        'move4': 'earthquake',
                        'ability': 'steadfast'
                    },
                    {
                        'pokeId': 350,
                        'name': 'milotic',
                        'move1': 'surf',
                        'move2': 'ice-beam',
                        'move3': 'mirror-coat',
                        'move4': 'aqua-ring',
                        'ability': 'marvel-scale'
                    },
                    {
                        'pokeId': 445,
                        'name': 'garchomp',
                        'move1': 'dragon-rush',
                        'move2': 'brick-break',
                        'move3': 'eartchquake',
                        'move4': 'giga-impact',
                        'ability': 'sand-veil'
                    }
                ],
                'user': '41224d776a326fb40f000001',
                'username': 'Banana',
                '_id': '41224d776a326fb40f000002'
            },
            {
                'name': 'champion',
                'pokemon': [
                    {
                        'pokeId': 637,
                        'name': 'volcarona',
                        'move1': 'quiver-dance',
                        'move2': 'fire-blast',
                        'move3': 'psychic',
                        'move4': 'bug-buzz',
                        'ability': 'flame-body'
                    },
                    {
                        'pokeId': 465,
                        'name': 'tangrowth',
                        'move1': 'knock-off',
                        'move2': 'giga-drain',
                        'move3': 'earthquake',
                        'move4': 'sludge-bomb',
                        'ability': 'regenerator'
                    },
                    {
                        'pokeId': 10075,
                        'name': 'diancie-mega',
                        'move1': 'moonblast',
                        'move2': 'earth-power',
                        'move3': 'diamond-storm',
                        'move4': 'protect',
                        'ability': 'magic-bounce'
                    }
                ],
                'user': '41224d776a326fb40f000001',
                'username': 'Banana',
                '_id': '41224d776a326fb40f000100'
            },
            {
                'name': "mind crush",
                'pokemon':[
                    {
                        'pokeId': 124,
                        'name': 'jynx',
                        'move1': 'psychic',
                        'move2': 'focus-blast',
                        'move3': 'blizzard',
                        'move4': 'perish-song',
                        'ability': 'forewarn'
                    },
                    {
                        'pokeId': 202,
                        'name': 'wobbuffet',
                        'move1': 'counter',
                        'move2': 'destiny-bond',
                        'move3': 'mirror-coat',
                        'move4': 'encore',
                        'ability': 'shadow-tag'
                    },
                    {
                        'pokeId': 475,
                        'name': 'gallade',
                        'move1': 'stone-edge',
                        'move2': 'psycho-cut',
                        'move3': 'night-slash',
                        'move4': 'close-combat',
                        'ability': 'steadfast'
                    },
                    {
                        'pokeId': 65,
                        'name': 'alakazam',
                        'move1': 'gravity',
                        'move2': 'psychic',
                        'move3': 'focus-blast',
                        'move4': 'energy-ball',
                        'ability': 'synchronize'
                    },
                    {
                        'pokeId': 196,
                        'name': 'espeon',
                        'move1': 'calm-mind',
                        'move2': 'psychic',
                        'move3': 'shadow-ball',
                        'move4': 'baton-pass',
                        'ability': 'synchronize'
                    },
                    {
                        'pokeId': 122,
                        'name': 'mr-mime',
                        'move1': 'reflect',
                        'move2': 'psychic',
                        'move3': 'thunder',
                        'move4': 'skill-swap',
                        'ability': 'filter'
                    }
                ],
                'user': '41224d776a326fb40f000010',
                'username': 'Sabrina',
                '_id': '41224d776a326fb40f000006'
            },
            {
                'name': 'Team Diantha',
                'pokemon': [
                    {
                        'pokeId': 701,
                        'name': 'hawlucha',
                        'move1': 'swords-dance',
                        'move2': 'flying-press',
                        'move3': 'x-scissor',
                        'move4': 'poison-jab',
                        'ability': 'limber'
                    },
                    {
                        'pokeId': 697,
                        'name': 'tyrantrum',
                        'move1': 'head-smash',
                        'move2': 'earthquake',
                        'move3': 'dragon-claw',
                        'move4': 'crunch',
                        'ability': 'strong-jaw'
                    },
                    {
                        'pokeId': 699,
                        'name': 'aurorus',
                        'move1': 'thunder',
                        'move2': 'blizzard',
                        'move3': 'light-screen',
                        'move4': 'reflect',
                        'ability': 'refrigerate'
                    },
                    {
                        'pokeId': 706,
                        'name': 'goodra',
                        'move1': 'dragon-pulse',
                        'move2': 'muddy-water',
                        'move3': 'focus-blast',
                        'move4': 'fire-blast',
                        'ability': 'sap-sipper'
                    },
                    {
                        'pokeId': 711,
                        'name': 'gourgeist-average',
                        'move1': 'trick-or-treat',
                        'move2': 'phantom-force',
                        'move3': 'shadow-sneak',
                        'move4': 'seed-bomb',
                        'ability': 'pickup'
                    },
                    {
                        'pokeId': 10051,
                        'name': 'gardevoir-mega',
                        'move1': 'moonblast',
                        'move2': 'psychic',
                        'move3': 'shadow-ball',
                        'move4': 'thunderbolt',
                        'item': 'gardevoirite',
                        'ability': 'pixilate'
                    }
                ],
                'user': '41224d776a326fb40f000020',
                'username': 'Diantha',
                '_id': '41224d776a326fb40f000021'
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
                'username': 'Zinnia',
                'text': 'Garchomp is OP'
            }
        ]
    }
]