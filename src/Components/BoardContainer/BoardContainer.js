import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import BoardForm from '../BoardForm/BoardForm';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
    formOpen: false,
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

  createBoard = (newBoard) => {
    boardsData.createBoard(newBoard)
      .then(() => {
        this.getAllBoards();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { boards, formOpen } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoardWithPins={this.deleteBoardWithPins} />);

    return (
      <div>
        <button className="btn btn-primary" onClick={() => { this.setState({ formOpen: !formOpen }); }}>Show Form</button>
          {formOpen ? <BoardForm createBoard={this.createBoard}/> : ''}
        <div className="card-columns mx-auto">
          {boardCard}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
