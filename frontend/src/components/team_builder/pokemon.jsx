import React from 'react';
import { DragSource } from 'react-dnd';
import './pokemon.css';
const Types = {
    POKEMON: 'pokemon',
};

const pokemonSource = {
    beginDrag(props){
        const { name, sprite, id, handleDrag } = props;
        handleDrag();
        const pokemon = { name, sprite, pokeId: id };
        return pokemon;
    },

    endDrag(props){
        props.handleDrag();
    }

};

const collect = (connect) => {
    return {
        connectDragSource: connect.dragSource(),
    };
};

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        this.setLoadState = this.setLoadState.bind(this);
        this.longName = this.longName.bind(this);
    }

    componentDidMount(){
        const lazyLoad = target => {
            const io = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-lazy');

                        img.setAttribute('src', src);
                       
                        observer.disconnect();
                        
                    }
                });
            });
            io.observe(target);

        };
        lazyLoad(this.imageRef);
    }

    setLoadState(){
        this.setState({
           loaded: true
        });
    }

    longName(name){
        // return name.length > 10 ||
        return name.includes("-");
    }

    render() {
        const { name, sprite, isDragging } = this.props;
        const { connectDragSource } = this.props;
        return connectDragSource(
            <li className={this.longName(name) ? "pokemon-container extra-pad" : "pokemon-container"}>
                <h3 className={this.longName(name) ? "pokemon-sprite-name long" : "pokemon-sprite-name"}>{name}</h3>
                <img ref={ref => this.imageRef = ref} 
                    onLoad={this.setLoadState}
                    className={this.state.loaded ? "pokemon-index-sprite" : "pokemon-index-sprite loading"} 
                    src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/13144987/jbareham_180922_0802_pokeball.png" 
                    data-lazy={sprite} 
                    alt="pokeball"
                />
            </li>
        )
    }
}

export default DragSource(Types.POKEMON, pokemonSource, collect)(Pokemon);