import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import  Splash  from './splash';

const mapStateToProps = state => {
    return {
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
