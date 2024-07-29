import { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import { useWavesurfer } from '@wavesurfer/react'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import Multitrack from 'wavesurfer-multitrack'


import Dashboard from '@components/Dashboard'
import lofi from '@assets/lofi.mp3'

const SongLab = () => {
  /* const containerRef = useRef(null)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    url: lofi,
    plugins: useMemo(() => [Timeline.create()], []),
  })


  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer]) */

  const containerRef = useRef(null);
  const playButtonRef = useRef(null);
  const forwardButtonRef = useRef(null);
  const backwardButtonRef = useRef(null);
  const downloadButtonRef = useRef(null);
  const sliderRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const multitrack = Multitrack.create(
      [
        {
          id: 1,
          draggable: true,
          startPosition: 14,
          url: lofi,
          envelope: [
            { time: 2, volume: 0.5 },
            { time: 10, volume: 0.8 },
            { time: 255, volume: 0.8 },
            { time: 264, volume: 0 },
          ],
          volume: 0.95,
          options: {
            waveColor: 'hsl(46, 87%, 49%)',
            progressColor: 'hsl(46, 87%, 20%)',
          },
          intro: {
            endTime: 16,
            label: 'Intro',
            color: '#FFE56E',
          },
          markers: [
            {
              time: 21,
              label: 'M1',
              color: 'hsla(600, 100%, 30%, 0.5)',
            },
            {
              time: 22.7,
              label: 'M2',
              color: 'hsla(400, 100%, 30%, 0.5)',
            },
            {
              time: 24,
              label: 'M3',
              color: 'hsla(200, 50%, 70%, 0.5)',
            },
            {
              time: 27,
              label: 'M4',
              color: 'hsla(200, 50%, 70%, 0.5)',
            },
          ],
        },
        {
          id: 2,
          draggable: true,
          startPosition: 1,
          startCue: 2.1,
          endCue: 20,
          fadeInEnd: 8,
          fadeOutStart: 14,
          envelope: true,
          volume: 0.8,
          options: {
            waveColor: 'hsl(161, 87%, 49%)',
            progressColor: 'hsl(161, 87%, 20%)',
          },
          url: lofi,
        },
        {
          id: 3,
          draggable: true,
          startPosition: 290,
          volume: 0.8,
          options: {
            waveColor: 'hsl(161, 87%, 49%)',
            progressColor: 'hsl(161, 87%, 20%)',
          },
          url: lofi,
        },
      ],
      {
        container: containerRef.current, // required!
        minPxPerSec: 10, // zoom level
        rightButtonDrag: false, // set to true to drag with right mouse button
        cursorWidth: 2,
        cursorColor: '#D72F21',
        trackBackground: '#2D2D2D',
        trackBorderColor: '#7C7C7C',
        dragBounds: true,
        envelopeOptions: {
          lineColor: 'rgba(255, 0, 0, 0.7)',
          lineWidth: 4,
          dragPointSize: window.innerWidth < 600 ? 20 : 10,
          dragPointFill: 'rgba(255, 255, 255, 0.8)',
          dragPointStroke: 'rgba(255, 255, 255, 0.3)',
        },
      }
    );
    console.log(multitrack);

    multitrack.on('drop', ({ id }) => {
      multitrack.addTrack({
        id,
        url: '/examples/audio/demo.wav',
        startPosition: 0,
        draggable: true,
        options: {
          waveColor: 'hsl(25, 87%, 49%)',
          progressColor: 'hsl(25, 87%, 20%)',
        },
      });
    });

    // Play/pause button
    const playButton = playButtonRef.current;
    playButton.disabled = true;
    multitrack.once('canplay', () => {
      playButton.disabled = false;
      playButton.onclick = () => {
        if (multitrack.isPlaying()) {
          multitrack.pause();
          setIsPlaying(false);
        } else {
          multitrack.play();
          setIsPlaying(true);
        }
      };
    });

    // Forward/back buttons
    forwardButtonRef.current.onclick = () => {
      multitrack.setTime(multitrack.getCurrentTime() + 30);
    };
    backwardButtonRef.current.onclick = () => {
      multitrack.setTime(multitrack.getCurrentTime() - 30);
    };

    // Zoom
    sliderRef.current.oninput = () => {
      multitrack.zoom(sliderRef.current.valueAsNumber);
    };

    // Set sinkId
    multitrack.once('canplay', async () => {
      await multitrack.setSinkId('default');
      console.log('Set sinkId to default');
    });

    downloadButtonRef.current.onclick = async () => {
    };

    return () => {
      multitrack.destroy();
    };
  }, []);


  return (
    <Dashboard>
      <div id="container" ref={containerRef}></div>
      <button id="play" ref={playButtonRef}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button id="forward" ref={forwardButtonRef}>Forward 30s</button>
      <button id="backward" ref={backwardButtonRef}>Backward 30s</button>
      <input type="range" ref={sliderRef} min="1" max="100" defaultValue="10" />
      <button id="download" ref={downloadButtonRef}>Download</button>
    </Dashboard>
  )
}

export default SongLab