import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

import logoSrc from '@assets/logo-white.svg';
import videoSrcLow from '@assets/auth_low.mp4'
import videoSrcMid from '@assets/auth_mid.mp4'
import videoSrcHd from '@assets/auth_hd.mp4'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const fadeOutLeft = {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
    };

    const fadeInRight = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: 100 },
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
                <AnimatePresence mode="wait">
                    {isLogin ? (
                        <motion.div
                            className="max-w-[400px] w-full"
                            key="login"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={fadeOutLeft}
                        >
                            <h2 className="mb-2 text-2xl font-bold">Login</h2>
                            <Input type="email" variant="bordered" label="Email" />
                            <Button radius="full" className="w-full mt-5 text-white bg-[#11181C]">
                                Entrar
                            </Button>
                            <p className="mt-3">
                                ¿No tienes cuenta? <span className="text-indigo-500 cursor-pointer" onClick={() => setIsLogin(false)}>Regístrate</span>
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="max-w-[400px] w-full"
                            key="register"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={fadeInRight}
                        >
                            <h2 className="text-2xl font-bold">Registro</h2>
                            <Input type="text" variant="bordered" label="Username" className="mt-3 shadow-none focus:border-violet-300" />
                            <Input type="email" variant="bordered" label="Email" className="mt-3" />
                            <Input type="password" variant="bordered" label="Password" className="mt-3" />
                            <Button radius="full" className="w-full mt-5 text-white bg-[#11181C]">
                                Registrate
                            </Button>
                            <p className="mt-3">
                                ¿Ya tienes cuenta? <span className="text-indigo-500 cursor-pointer" onClick={() => setIsLogin(true)}>Ingresa</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Auth
