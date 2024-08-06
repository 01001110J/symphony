import { useRef, useEffect, useContext } from 'react';
import { DarkThemeContext } from '@context/DarkTheme';

const noteVariations = ['♩', '♪', '♫', '♬', '♭', '♯', '𝄞', '𝄢', '♮'];
const grayColors = ['#CCCCCC', '#AAAAAA', '#888888'];
const yellowColors = ['#fef08a', '#facc15', '#ca8a04'];

const DotAnimation = () => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const { isDarkMode } = useContext(DarkThemeContext);

  const dotColors = isDarkMode ? grayColors : yellowColors;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initDots = () => {
      const newDots = [];

      for (let i = 0; i < 50; i++) {
        newDots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 1,
          speed: Math.random() * 0.5 + 0.1,
          color: dotColors[Math.floor(Math.random() * grayColors.length)],
          character: noteVariations[Math.floor(Math.random() * noteVariations.length)],
        });
      }
      dotsRef.current = newDots;
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotsRef.current.forEach((dot) => {
        ctx.fillStyle = dot.color;
        ctx.font = `${dot.size * 8}px Arial`;
        ctx.fillText(dot.character, dot.x, dot.y);
      });
    };

    const moveDots = () => {
      dotsRef.current = dotsRef.current.map((dot) => {
        let newX = dot.x - dot.speed;
        let newY = dot.y + dot.speed;

        const dx = mousePosRef.current.x - newX;
        const dy = mousePosRef.current.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          newX += dx * 0.01;
          newY += dy * 0.01;
        }

        if (newX < 0 || newY > canvas.height) {
          newX = canvas.width;
          newY = Math.random() * canvas.height;
        }

        return { ...dot, x: newX, y: newY };
      });
    };

    const animate = () => {
      drawDots();
      moveDots();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initDots();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initDots();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />;
};

export default DotAnimation;
