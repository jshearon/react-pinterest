import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    createBoard: PropTypes.func.isRequired,
    updateBoard: PropTypes.func.isRequired,
    boardThatIAmEditing: PropTypes.object.isRequired,
  }

  state = {
    name: '',
    isEditing: false,
  }

  componentDidMount() {
    const { boardThatIAmEditing } = this.props;
    if (boardThatIAmEditing.name) {
      this.setState({
        name: boardThatIAmEditing.name,
        isEditing: true,
      });
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { createBoard } = this.props;

    const newBoard = {
      name,
      uid: authData.getUid(),
    };
    createBoard(newBoard);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { updateBoard, boardThatIAmEditing } = this.props;

    const myBoardWithChanges = {
      name,
      uid: authData.getUid(),
    };

    updateBoard(boardThatIAmEditing.id, myBoardWithChanges);
  }

  render() {
    const {
      name,
      isEditing,
    } = this.state;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            className="form-control"
            id="boardName"
            aria-describedby="emailHelp"
            onChange={this.changeNameEvent}
            value={name}
            />
        </div>
        {
          isEditing
            ? <button className="btn btn-light" onClick={this.editBoardEvent}>Edit Board</button>
            : <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
        }
    </form>
    );
  }
}

export default BoardForm;
