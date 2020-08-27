import React from 'react';
import PropTypes from 'prop-types';

import './Pin.scss';

import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletePin: PropTypes.func.isRequired,
    editPin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, deletePin } = this.props;
    deletePin(pin.id);
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { pin, editPin } = this.props;
    editPin(pin);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card text-center pins mx-3 h-100">
        <div className="card-header"><h5>{pin.title}</h5></div>
        <div className="card-body">
          <img src={pin.image} alt={pin.title} />
          <p className="card-text"></p>
          <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete Pin</button>
          <button className="btn btn-warning" onClick={this.editPinEvent}>Edit Pin</button>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    );
  }
}

export default Pin;
