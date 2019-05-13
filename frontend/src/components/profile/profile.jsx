import React from 'react'

class Profile extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchUserComments();
        this.props.fetchUserTeams();
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default Profile