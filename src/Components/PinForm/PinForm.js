import React from 'react';
import PropTypes from 'prop-types';

class PinForm extends React.Component {
  static propTypes = {
    createPin: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    pinToEdit: PropTypes.object.isRequired,
    updatePin: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    image: '',
    url: '',
    editInProcess: false,
  }

  componentDidMount() {
    const { pinToEdit } = this.props;
    if (pinToEdit.title) {
      this.setState({
        title: pinToEdit.title,
        image: pinToEdit.image,
        url: pinToEdit.url,
        editInProcess: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevPin = prevProps.pinToEdit;
    const incomingPin = this.props.pinToEdit;
    if (prevPin.title !== incomingPin.title) {
      this.setState({
        title: incomingPin.title || '',
        image: incomingPin.image || '',
        url: incomingPin.url || '',
        editInProcess: !!incomingPin.title,
      });
    }
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

  editPinEvent =(e) => {
    e.preventDefault();
    const { title, image, url } = this.state;
    const { updatePin, pinToEdit, boardId } = this.props;

    const editedPin = {
      title,
      image,
      url,
      boardId,
    };
    updatePin(pinToEdit.id, editedPin);
  }

  render() {
    const {
      title,
      image,
      url,
      editInProcess,
    } = this.state;
    return (
      <form>
        <div className="form-group">
          <label htmlFor="pinTitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="pinTitle"
            onChange={this.changeTitleEvent}
            value={title}
            />
        </div>
        <div className="form-group">
          <label htmlFor="pinImage">Image</label>
          <input
            type="text"
            className="form-control"
            id="pinImage"
            onChange={this.changeImageEvent}
            value={image}
            />
        </div>
        <div className="form-group">
          <label htmlFor="pinUrl">URL</label>
          <input
            type="text"
            className="form-control"
            id="pinUrl"
            onChange={this.changeUrlEvent}
            value={url}
            />
        </div>
    {
      editInProcess
        ? <button type="submit" className="btn btn-primary" onClick={this.editPinEvent}>Update</button>
        : <button type="submit" className="btn btn-primary" onClick={this.savePinEvent}>Submit</button>
    }
    </form>
    );
  }
}

export default PinForm;
