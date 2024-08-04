import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import app from '@config';

import LoginForm from '@components/Auth/LoginForm';
import VideoBackground from '@components/Auth/VideoBg';
import RegisterForm from '@components/Auth/RegisterForm';

import authReducer, { initialState, SET_REQUEST_INFO, SET_USER_INFO } from '@context/reducers/authReducer.js';

const Auth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const handleInputChange = (field) => (e) => {
    dispatch({
      type: SET_USER_INFO,
      payload: { ...authState.user, [field]: e.target.value },
    });
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, authState.user.email, authState.user.password);
      navigate('/');
    } catch (error) {
      dispatch({
        type: SET_REQUEST_INFO,
        payload: {
          error: true,
          message: 'Email o contraseña incorrecta, intenta nuevamente.',
        },
      });
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (!authState.user.userName) {
      dispatch({
        type: SET_REQUEST_INFO,
        payload: {
          error: true,
          message: 'El nombre de usuario es requerido.',
        },
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, authState.user.email, authState.user.password);
      navigate('/');
    } catch (error) {
      dispatch({
        type: SET_REQUEST_INFO,
        payload: {
          error: true,
          message: 'Failed to create account. ' + error.message,
        },
      });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      dispatch({
        type: SET_REQUEST_INFO,
        payload: {
          error: true,
          message: 'Vaya... No pudimos hacer el registro con Google. Por favor, intenta nuevamente.',
        },
      });
    }
  };

  return (
    <section className="flex min-w-full min-h-screen overflow-hidden">
      <VideoBackground />
      <div className="flex items-center justify-center w-full px-4">
        {authState.isLogin ? (
          <LoginForm authState={authState} handleInputChange={handleInputChange} signIn={signIn} dispatch={dispatch} />
        ) : (
          <RegisterForm
            authState={authState}
            handleInputChange={handleInputChange}
            signUp={signUp}
            signInWithGoogle={signInWithGoogle}
            dispatch={dispatch}
          />
        )}
      </div>
    </section>
  );
};

export default Auth;
