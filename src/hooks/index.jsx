import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * Custom hook to hide an element based on the current route.
 * @returns {string} CSS class to hide the element if necessary.
 */
export const useHideElement = () => {
  const location = useLocation();
  const isNewSongRoute = location.pathname === '/song/new';

  return isNewSongRoute ? 'invisible' : '';
};

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setUser(null);
      }

      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
