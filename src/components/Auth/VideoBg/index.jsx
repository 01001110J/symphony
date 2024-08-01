import videoSrcLow from '@assets/auth_low.mp4';
import videoSrcMid from '@assets/auth_mid.mp4';
import videoSrcHd from '@assets/auth_hd.mp4';
import logoSrc from '@assets/logo-white.svg';

const VideoBackground = () => (
    <div className="hidden md:block md:w-[950px] bg-slate-800 h-screen relative overflow-hidden">
        <video preload="none" autoPlay muted loop className="absolute top-0 left-0 object-cover w-full h-full">
            <source src={videoSrcLow} type="video/mp4" media="(max-width: 800px)" />
            <source src={videoSrcMid} type="video/mp4" media="(min-width: 1024px) and (max-width: 1280px)" />
            <source src={videoSrcHd} type="video/mp4" media="(min-width: 1536px)" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 flex flex-col p-4 text-white py-14">
            <div className="flex items-center mb-8">
                <img src={logoSrc} className="h-8 mr-3" alt="Symphony Logo" />
                <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">Symphony</span>
            </div>
            <p className="text-xl font-light">
                Explora nuevas posibilidades sonoras y lleva tus proyectos musicales al siguiente nivel con la potencia de la IA.
            </p>
        </div>
    </div>
);

export default VideoBackground;