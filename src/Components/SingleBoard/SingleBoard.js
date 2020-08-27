import React from 'react';
import PropTypes from 'prop-types';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
    formOpen: false,
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

  createPin = (newPin) => {
    pinsData.createPin(newPin)
      .then(() => {
        this.getAllBoardsAndPins();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error(err));
  }

  editPin = (pinToEdit) => {
    console.error(pinToEdit);
  }

  render() {
    const { board, pins, formOpen } = this.state;
    const { setSingleBoard, boardId } = this.props;

    const pinCards = pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin} editPin={this.editPin} />);

    return (
      <div>
        <h4>{board.name}</h4>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>Back</button>
        <button className="btn btn-primary" onClick={() => { this.setState({ formOpen: !formOpen }); }}>Add Pin</button>
        {formOpen ? <PinForm boardId={boardId} createPin={this.createPin} /> : ''}
          <div className="card-columns">
            {pinCards}
          </div>
      </div>
    );
  }
}

export default SingleBoard;
