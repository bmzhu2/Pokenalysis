# POKEANALYSIS
## The Social Pokemon Team Builder

Pokenalysis is a online team builder that leverages the [PokéAPI](https://pokeapi.co/) and allows users to create, analyze, save, and share teams of Pokemon. 

[Live Demo](https://pokenalysis.herokuapp.com/#/)

![teambuilder](https://github.com/bmzhu2/Pokenalysis/blob/master/docs/teambuilder_demo.png)

![stats](https://github.com/bmzhu2/Pokenalysis/blob/master/docs/teamstats_demo.png)

### Functionality and MVP

1. Users can create, edit, and save (if logged in) teams of 6 Pokemon
2. Browse, search by name, or filter by type to easily find Pokemon to put on team
3. Pokemon teams are analyzed and important information (Statistics, strengths, and weaknesses) is displayed intuitively
4. Pokemon teams are displayed on a social feed for others to explore and like.
5. A user's profile contains their public information, created teams, and liked teams.

```
   //filter code
   filterPokemon(...filters){
        const newFilter = filters[0] && filters[1] ? filters : filters[0] ? [filters[0]] : filters[1] ? [filters[1]] : [];
        
        this.setState((state, props) => {
            const pokemon = !newFilter.length ? Object.values(props.pokemon) : Object.values(props.pokemon).filter(poke => {
                return !!poke.types && newFilter.every(filter => poke.types.includes(filter));
            });
            return { pokemon };
        });
    }

    async filterByType(filter, type){
        const filters = Object.assign(this.state);
        filters[filter] = type;

        const { typeFilter1, typeFilter2 } = filters;
        
            if (typeFilter1 && !typeFilter2) {
                await this.props.fetchByType(typeFilter1);
                this.filterPokemon(typeFilter1, typeFilter2);      
            } else if (!typeFilter1 && typeFilter2) {
                await this.props.fetchByType(typeFilter2);
                this.filterPokemon(typeFilter1, typeFilter2);   
            } else if (typeFilter1 && typeFilter2) {
                await this.props.fetchByType(typeFilter1).then(() => this.props.fetchByType(typeFilter2));
                this.filterPokemon(typeFilter1, typeFilter2);
            } else {
                this.filterPokemon(typeFilter1, typeFilter2);
            }
    }
```


### Bonus Features
1. Ability to comment on teams
2. Compare teams head to head
3. Dynamically generated suggestions to improve one's team

### Technologies Used

#### Backend
* MongoDB
* Express

#### FrontEnd
* React.js
* Node.js
* Pokeapi

### Technical Challenges

* Analyzing & rendering of a team's stats, strengths, and weaknesses in an effecient and easy to understand manner

* Intuitive User interface to create, edit, share, and explore created teams


### Things Accomplished Over Weekend

* Wireframes, tentative plan for scheme &  model
* Project & Git setup 
* Backend login and signup functionality
* Start of Login, Signup, and Splash page 


### Group Members and Division of Labor 

- Tristan Blarel
    * Frontend Components, UI/UX

- Brian Zhu
    *  Schema & models, React/Redux cycle (routes, actions, api)

- Preston Nowakowski
    * Frontend Components, UI/UX
 
- Sam Inglese
    * Schema & models, React/Redux cycle (routes, actions, api)
 
