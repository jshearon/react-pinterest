import PropTypes from 'prop-types';

const pinShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
});

export default { pinShape };
