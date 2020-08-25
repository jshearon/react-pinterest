import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    createBoard: PropTypes.func.isRequired,
  }

  state = {
    name: '',
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
      ownedBy: authData.getUid(),
    };
    createBoard(newBoard);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="boardName">Board Name</label>
          <input type="text" className="form-control" id="boardName" aria-describedby="emailHelp" onChange={this.changeNameEvent} />
        </div>
      <button type="submit" className="btn btn-primary" onClick={this.saveBoardEvent}>Submit</button>
    </form>
    );
  }
}

export default BoardForm;
