import { signup, login, logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import Login from './login';

const mapStateToProps = state => {
    return ({
        currentUser: state.session.id,
        errors: state.errors.session,
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        login: user => dispatch(login(user)),
        logout: user => dispatch(logout(user)),
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);