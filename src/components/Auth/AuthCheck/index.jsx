import PropTypes from 'prop-types';

import { useAuth } from '@hooks';

const AuthCheck = ({ children }) => {
  const user = useAuth();

  if (user === null) {
    return <p>Login to enjoy this</p>;
  }

  return children;
};

AuthCheck.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCheck;
