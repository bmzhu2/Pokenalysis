import { signup, login, logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import Register from './register';

const mapStateToProps = state => {
    return ({
        currentUser: state.session.id,
        errors: state.errors.session,
    });
};

const mapDispatchToProps = dispatch => {
    return {
      register: user => dispatch(signup(user)),
      logout: user => dispatch(logout(user)),
      login: user => dispatch(login(user)),
      openModal: mode => dispatch(openModal(mode)),
      closeModal: () => dispatch(closeModal())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);