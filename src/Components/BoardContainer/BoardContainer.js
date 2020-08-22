import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  getAllBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('get boards broke!!', err));
  };

  componentDidMount() {
    this.getAllBoards();
  }

  deleteBoardWithPins = (boardId) => {
    boardsData.deleteBoard(boardId)
      .then(() => {
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => {
            pins.forEach((pin) => {
              pinsData.deletePin(pin.id);
            });
            this.getAllBoards();
          });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoardWithPins={this.deleteBoardWithPins} />);

    return (
      <div className="card-columns mx-auto">
        {boardCard}
      </div>
    );
  }
}

export default BoardContainer;
