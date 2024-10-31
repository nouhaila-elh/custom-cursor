import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [largePosition, setLargePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const followMouse = () => {
            setLargePosition((prevPos) => ({
                x: prevPos.x + (mousePosition.x - prevPos.x) * 0.6,
                y: prevPos.y + (mousePosition.y - prevPos.y) * 0.6,
            }));
            requestAnimationFrame(followMouse);
        };

        followMouse();
    }, [mousePosition]);

    return (
        <>
            <CursorSmall style={{ transform: `translate(${mousePosition.x - 5}px, ${mousePosition.y - 5}px)` }} />
            <CursorLarge style={{ transform: `translate(${largePosition.x - 25}px, ${largePosition.y - 25}px)` }} />
        </>
    );
};

export default CustomCursor;

const CursorSmall = styled.div`
  position: fixed;
  width: 10px;
  height: 10px;
  background-color: #00ADB5; 
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
`;

const CursorLarge = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 173, 181, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  transition: transform 0.2s ease-out;
`;
