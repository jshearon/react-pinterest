import React from 'react';
import PropTypes from 'prop-types';

class PinForm extends React.Component {
  static propTypes = {
    createPins: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
  }

  state = {
    title: '',
    image: '',
    url: '',
  }

  changeTitleEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ image: e.target.value });
  }

  changeUrlEvent = (e) => {
    e.preventDefault();
    this.setState({ url: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { title, image, url } = this.state;
    const { createPin, boardId } = this.props;

    const newPin = {
      title,
      image,
      url,
      boardId,
    };
    createPin(newPin);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="pinTitle">Title</label>
          <input type="text" className="form-control" id="pinTitle" aria-describedby="emailHelp" onChange={this.changeTitleEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="pinImage">Image</label>
          <input type="text" className="form-control" id="pinImage" aria-describedby="emailHelp" onChange={this.changeImageEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="pinUrl">Url</label>
          <input type="text" className="form-control" id="pinUrl" aria-describedby="emailHelp" onChange={this.changeUrlEvent}/>
        </div>
      <button type="submit" className="btn btn-primary" onClick={this.savePinEvent}>Submit</button>
    </form>
    );
  }
}

export default PinForm;
