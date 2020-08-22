import React from 'react';
import PropTypes from 'prop-types';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pin from '../Pin/Pin';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
  }

  getAllBoardsAndPins = () => {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((boardResponse) => {
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => {
            this.setState({ board: boardResponse.data, pins });
          });
      })
      .catch((err) => console.error('get single board failed', err));
  }

  componentDidMount() {
    this.getAllBoardsAndPins();
  }

  deletePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => {
        this.getAllBoardsAndPins();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { board, pins } = this.state;
    const { setSingleBoard } = this.props;

    const pinCards = pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin}/>);

    return (
      <div>
        <h4>{board.name}</h4>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>X</button>
          <div className="d-flex justify-content-center flex-wrap">
            {pinCards}
          </div>
      </div>
    );
  }
}

export default SingleBoard;
