import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css'

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [pageLoadTime, setPageLoadTime] = useState(0);

  useEffect(() => {
    fetchImages();
    trackPageLoadTime();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://api.unsplash.com/photos/?client_id=iwHnApX5TClddfioUel09vnTXZEXJNG65FA11UNrLgU');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const trackPageLoadTime = () => {
    const pageLoadStartTime = performance.timing.navigationStart;
    const pageLoadEndTime = performance.now();
    setPageLoadTime(pageLoadEndTime - pageLoadStartTime);
  };

  return (
    <div className="image-gallery">
      {Array.isArray(images) && images.map(image => (
        <div key={image.id} style={{ position: 'relative' }}>
          <img
            src={image.urls.thumb}
            alt={image.alt_description}
            onClick={() => window.open(image.urls.full, '_blank')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ))}
      <div style={{ position: 'absolute', top: 0, left: 0, background: 'rgba(255, 255, 255, 0.8)', padding: '2px 5px' }}>
        Page Load Time: {pageLoadTime.toFixed(2)} ms
      </div>
    </div>
  );
}

export default ImageGallery;