import { useRef, useEffect, useState } from 'react'
import WaveformPlaylist from "waveform-playlist";
import { Input, Button, Tooltip, Divider } from "@nextui-org/react";
import { CiChat1, CiFolderOn, CiFileOn, CiPause1 } from "react-icons/ci";
// import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { RiArrowGoBackFill } from "react-icons/ri";
import { PiDownloadSimple } from "react-icons/pi";



import Dashboard from '@components/Dashboard'
import lofi from '@assets/lofi.mp3'
import lofibass from '@assets/bass.mp3'
import logoSrc from '@assets/logo.svg';

import './SongLab.css'

const SongLab = () => {
    const refs = useRef({
        container: null,
        playButton: null,
        forwardButton: null,
        backwardButton: null,
        downloadButton: null
    });
    const isPlayingRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const playlist = WaveformPlaylist({
            samplesPerPixel: 128,
            waveHeight: 100,
            container: refs.current.container,
            state: "shift",
            timescale: true,
            controls: {
                show: true,
                width: 200
            },
            seekStyle: 'line',
            zoomLevels: [128, 256, 512]
        });

        playlist.load([
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofi,
                name: "Vocals",
                gain: 0.5,
            },
            {
                src: lofibass,
                name: "Drums",
                fadeIn: {
                    duration: 0.5,
                },
                fadeOut: {
                    shape: "logarithmic",
                    duration: 0.5,
                },
            },
        ]).then(() => {
            playlist.initExporter();
            const ee = playlist.getEventEmitter();

            refs.current.playButton.onclick = async () => {
                if (isPlayingRef.current) {
                    isPlayingRef.current = false;
                    setIsPlaying(false);
                    ee.emit("pause");
                } else {
                    isPlayingRef.current = true;
                    setIsPlaying(true);
                    ee.emit("play");
                }
            };

            refs.current.downloadButton.onclick = async () => {
                ee.emit('startaudiorendering', 'wav');
            };

            // refs.current.forwardButton.onclick = () => {};
            // refs.current.backwardButton.onclick = () => {};
        });
    }, []);

    return (
        <Dashboard>
            <section className='flex flex-col md:flex-row w-full min-h-[calc(100vh-96px)]'>
                <aside className="w-full py-5 md:w-96">
                    <div className='w-full h-full rounded-xl'>
                        <div className='flex flex-col w-full p-3 mb-3 bg-white border border-gray-300 h-1/2 rounded-xl'>
                            <div className='flex flex-col h-full pt-3 mb-2'>
                                <p className='p-3 mb-5 text-white rounded-tl-3xl rounded-bl-3xl rounded-br-3xl bg-[#F1817B] w-fit'>
                                    A grand orchestral arrangement with thunderous percussion, epic brass fanfares, and soaring strings, creating a cinematic atmosphere fit for a heroic battle.
                                </p>
                                <p className='p-3 text-[#2C3244] bg-[#F4F5FC] rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl w-fit'>
                                    Sure!
                                </p>
                            </div>
                            <Divider className='mb-3' />
                            <div className="flex">
                                <Input placeholder='Describe la canción de tus seños' />
                                <Tooltip content="Pedir una nueva pista" placement='right'>
                                    <Button className='ml-3' variant='bordered'><CiChat1 /></Button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='w-full mt-3 overflow-hidden bg-white border border-gray-300 h-1/2 rounded-xl'>
                            <div>
                                <div className='flex items-center p-3 pl-5'>
                                    <CiFolderOn className="mr-2 text-2xl" />
                                    <span className='font-semibold'>Recursos</span>
                                </div>
                                <Divider className='mb-3' />
                            </div>
                            <div className='flex flex-col h-full'>
                                <div className='flex items-center py-3 pl-3 mb-1 hover:bg-gray-100'>
                                    <CiFileOn className='mr-2 text-xl' />
                                    <span>La macarena.mp3</span>
                                </div>
                                <div className='flex items-center py-3 pl-3 mb-1 hover:bg-gray-100'>
                                    <CiFileOn className='mr-2 text-xl' />
                                    <span>La macarena.mp3</span>
                                </div>
                                <div className='flex items-center py-3 pl-3 mb-1 hover:bg-gray-100'>
                                    <CiFileOn className='mr-2 text-xl' />
                                    <span>La macarena.mp3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className='w-full h-[calc(100vh-105px)] md:pt-5 md:pr-3'>
                    <div className='w-full h-full p-5 bg-white border border-gray-300 md:ml-3 rounded-xl grid grid-rows-[1fr_10px_50px] overflow-hidden'>
                        <div className='row-start-1 overflow-scroll'>
                            <div id="container" ref={el => refs.current.container = el} />
                        </div>
                        <Divider className='row-start-2 my-3' />
                        <div className='flex items-center justify-between row-start-3'>
                            <div className='flex items-center'>
                                <Tooltip content="Retroceder 30s">
                                    <button id="backward" ref={el => refs.current.backwardButton = el}>
                                        <RiArrowGoBackFill />
                                    </button>
                                </Tooltip>
                                <Tooltip content={isPlaying ? 'Pause' : 'Play'}>
                                    <button id="play" ref={el => refs.current.playButton = el}>
                                        {isPlaying ? <CiPause1 className='text-xl' /> : <img className='h-7' src={logoSrc} alt='' />}
                                    </button>
                                </Tooltip>
                                <Tooltip content="Avanzar 30s">
                                    <button id="forward" ref={el => refs.current.forwardButton = el}>
                                        <RiArrowGoBackFill className='transform scale-x-[-1]' />
                                    </button>
                                </Tooltip>
                            </div>
                            <Tooltip content="Descargar">
                                <button id="download" ref={el => refs.current.downloadButton = el}>
                                    <PiDownloadSimple className='text-2xl' />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </section>
        </Dashboard>
    );
};

export default SongLab;
