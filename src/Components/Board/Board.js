import React from 'react';
import PropTypes from 'prop-types';

import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
    deleteBoardWithPins: PropTypes.func.isRequired,
    editABoard: PropTypes.func.isRequired,
  }

  singleBoardEvent = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  deleteBoardEvent = (e) => {
    e.preventDefault();
    const { board, deleteBoardWithPins } = this.props;
    deleteBoardWithPins(board.id);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { editABoard, board } = this.props;
    editABoard(board);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="card text-center">
        <div className="card-header"><h5>{board.name}</h5></div>
        <div className="card-body">
          <p className="card-text"></p>
          <button className="btn btn-secondary" onClick={this.singleBoardEvent}>View Board Details</button>
        </div>
        <div className="card-footer text-muted d-flex justify-content-end">
          <div className="btn-group" role="group">
          <button className="btn btn-secondary" onClick={this.editBoardEvent}>Edit</button>
          <button className="btn btn-danger" onClick={this.deleteBoardEvent}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
