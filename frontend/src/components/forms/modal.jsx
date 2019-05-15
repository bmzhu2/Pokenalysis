import React from "react";
import { openModal, closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import LoginContainer from "./login_container";
import RegisterContainer from "./register_container";
import './modal.css';

class SessionModal extends React.Component {
  render() {
    if (!this.props.modal) {
      return null;
    }
    let form;
    switch (this.props.modal) {
      case "login":
        form = <LoginContainer />;
        break;
      case "register":
        form = <RegisterContainer />;
        break;
      default:
        return null;
    }
    return (
      <div className="modal-background fadeIn" onClick={(this.props.closeModal)}>
        <button className="modal-close-button fadeIn">
          <i className="fas fa-times" />
        </button>
        <div
          className="modal-child slideInDown"
          onClick={e => e.stopPropagation()}
        >
          {form}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  openModal: mode => dispatch(openModal(mode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionModal);
