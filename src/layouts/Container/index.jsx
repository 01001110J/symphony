import PropTypes from 'prop-types';

const Container = ({ children }) => <main className="min-h-screen dark:bg-gray-900">{children}</main>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
