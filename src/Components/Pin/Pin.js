import React from 'react';

import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card text-center">
        <div className="card-header"><h5>{pin.title}</h5></div>
        <div className="card-body">
          <img src={pin.image} alt={pin.title} />
          <p className="card-text"></p>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    );
  }
}

export default Pin;
