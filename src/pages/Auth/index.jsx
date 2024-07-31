import { useReducer } from "react";
import { Input, Button } from "@nextui-org/react";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import app from '@config';

import authReducer, {
    initialState,
    SET_REQUEST_INFO,
    SET_LOGIN_STATE,
    SET_USER_INFO,
    RESET
} from './reducer.js'

import videoSrcLow from '@assets/auth_low.mp4'
import videoSrcMid from '@assets/auth_mid.mp4'
import videoSrcHd from '@assets/auth_hd.mp4'

import logoSrc from '@assets/logo-white.svg';


const Auth = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [authState, dispatch] = useReducer(authReducer, initialState);

    const signIn = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, authState.user.email, authState.user.password);
            navigate('/explore');
        } catch (error) {
            dispatch({
                type: SET_REQUEST_INFO,
                payload: {
                    error: true,
                    message: "Email o contraseña incorrecta, intenta nuevamente."
                }
            })
        }
    };

    const signUp = async (e) => {
        e.preventDefault();

        if (!authState.user.userName) {
            dispatch({
                type: SET_REQUEST_INFO, payload: {
                    error: true,
                    message: "El nombre de usuario es requerido."
                }
            });

            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, authState.user.email, authState.user.password);
            navigate('/explore');
        } catch (error) {
            dispatch({
                type: SET_REQUEST_INFO, payload: {
                    error: true,
                    message: "Failed to create account. " + error.message
                }
            });
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            navigate('/explore');
        } catch (error) {
            dispatch({ type: SET_REQUEST_INFO, payload: "Vaya... No pudimos hacer el registro con Google. Por favor, intenta nuevamente." });
        }
    };

    return (
        <section className="flex min-w-full min-h-screen overflow-hidden">
            <div className="hidden md:block md:w-[950px] bg-slate-800 h-screen relative overflow-hidden">
                <video preload="none" autoPlay muted loop className="absolute top-0 left-0 object-cover w-full h-full">
                    <source src={videoSrcLow} type="video/mp4" media="(max-width: 800px)" />
                    <source src={videoSrcMid} type="video/mp4" media="(min-width: 1024px) and (max-width: 1280px)" />
                    <source src={videoSrcHd} type="video/mp4" media="(min-width: 1536px)" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 flex flex-col p-4 text-white py-14">
                    <div className="flex items-center mb-8">
                        <img
                            src={logoSrc}
                            className="h-8 mr-3"
                            alt="Symphony Logo"
                        />
                        <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">Symphony</span>
                    </div>
                    <p className="text-xl font-light">
                        Explora nuevas posibilidades sonoras y lleva tus proyectos musicales al siguiente nivel con la potencia de la IA.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center w-full px-4">
                {authState.isLogin ? (
                    <div
                        className="max-w-[400px] w-full"
                    >
                        <h2 className="mb-2 text-2xl font-bold">Login</h2>
                        <Input
                            type="email"
                            variant="bordered"
                            label="Email"
                            isInvalid={authState.request.error}
                            errorMessage={authState.request.message}
                            value={authState.user.email}
                            onChange={(e) => dispatch({
                                type: SET_USER_INFO, payload: {
                                    ...authState.user,
                                    email: e.target.value
                                }
                            })
                            }
                        />
                        <Input
                            type="password"
                            variant="bordered"
                            label="Password"
                            className="mt-3"
                            value={authState.user.password}
                            onChange={(e) => {
                                dispatch({
                                    type: SET_USER_INFO, payload: {
                                        ...authState.user,
                                        password: e.target.value
                                    }
                                })
                            }
                            }
                        />
                        <Button
                            radius="full"
                            className="w-full mt-5 text-white bg-[#11181C]"
                            onClick={signIn}
                        >
                            Entrar
                        </Button>
                        <p className="mt-3">
                            ¿No tienes cuenta?
                            <span
                                className="ml-2 text-indigo-500 cursor-pointer"
                                onClick={() => {
                                    dispatch({ type: RESET })
                                    dispatch({ type: SET_LOGIN_STATE, payload: false })
                                }}>
                                Regístrate
                            </span>
                        </p>
                    </div>
                ) : (
                    <div
                        className="max-w-[400px] w-full"
                        key={`register-${authState.request.error}`}
                    >
                        <h2 className="text-2xl font-bold">Registro</h2>
                        <Input
                            type="text"
                            variant="bordered"
                            label="Username"
                            className="mt-3 shadow-none focus:border-violet-300"
                            isInvalid={authState.request.error}
                            errorMessage={authState.request.message}
                            value={authState.user.userName}
                            onChange={(e) => dispatch({
                                type: SET_USER_INFO, payload: {
                                    ...authState.user,
                                    userName: e.target.value
                                }
                            })
                            }
                        />
                        <Input
                            type="email"
                            variant="bordered"
                            label="Email"
                            className="mt-3"
                            value={authState.user.email}
                            onChange={(e) => dispatch({
                                type: SET_USER_INFO, payload: {
                                    ...authState.user,
                                    email: e.target.value
                                }
                            })
                            }
                        />
                        <Input
                            type="password"
                            variant="bordered"
                            label="Password"
                            className="mt-3"
                            value={authState.user.password}
                            onChange={(e) => dispatch({
                                type: SET_USER_INFO, payload: {
                                    ...authState.user,
                                    password: e.target.value
                                }
                            })
                            }
                        />
                        <Button
                            radius="full"
                            className="w-full mt-5 text-white bg-[#11181C]"
                            onClick={signUp}
                        >
                            Registrate
                        </Button>
                        <Button
                            radius="full"
                            className="w-full mt-5 text-white bg-[#11181C]"
                            onClick={signInWithGoogle}
                        >
                            Registrate con google
                        </Button>
                        <p className="mt-3">
                            ¿Ya tienes cuenta?
                            <span className="text-indigo-500 cursor-pointer"
                                onClick={() => dispatch({ type: SET_LOGIN_STATE, payload: true })}>
                                Ingresa
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Auth
