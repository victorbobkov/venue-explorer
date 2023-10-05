import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ScrollableContainer.css';

// Component renders a horizontally scrollable container for elements such as tags or labels
const ScrollableContainer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    // Handle the initiation of a drag
    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - containerElement.offsetLeft;
      scrollLeft = containerElement.scrollLeft;
    };

    // Reset dragging status when mouse leaves the container or mouse button is released
    const handleMouseLeave = () => {
      isDown = false;
    };
    const handleMouseUp = () => {
      isDown = false;
    };

    // Handle the dragging to scroll the container
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - containerElement.offsetLeft;
      const walk = x - startX;
      containerElement.scrollLeft = scrollLeft - walk;
    };

    containerElement.addEventListener('mousedown', handleMouseDown);
    containerElement.addEventListener('mouseleave', handleMouseLeave);
    containerElement.addEventListener('mouseup', handleMouseUp);
    containerElement.addEventListener('mousemove', handleMouseMove);

    // Clean up event listeners on component unmount
    return () => {
      containerElement.removeEventListener('mousedown', handleMouseDown);
      containerElement.removeEventListener('mouseleave', handleMouseLeave);
      containerElement.removeEventListener('mouseup', handleMouseUp);
      containerElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="venue-details__amenities">{children}</div>;
};

ScrollableContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ScrollableContainer;
