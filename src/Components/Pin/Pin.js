import React from 'react';
import PropTypes from 'prop-types';

import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletePin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, deletePin } = this.props;
    deletePin(pin.id);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card text-center">
        <div className="card-header"><h5>{pin.title}</h5></div>
        <div className="card-body">
          <img src={pin.image} alt={pin.title} />
          <p className="card-text"></p>
          <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete Pin</button>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    );
  }
}

export default Pin;
