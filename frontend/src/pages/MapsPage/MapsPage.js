import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Importazione delle immagini e dei file
import imageSrc from '../../assets/images/ceneri.png';
import pdfFile from '../../assets/documents/piazza300ceneri.pdf';

const MapsPage = () => {
  const { t } = useTranslation();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);

  // Coordinate originali (dimensioni immagine originale)
  const originalAreas = [
    {
      coords: [1610, 945, 1850, 1030], // Coordinate originali
      file: pdfFile,
      fileName: 'piazza300ceneri.pdf',
    }
  ];

  // Aggiorna le dimensioni dell'immagine quando carica
  useEffect(() => {
    const updateDimensions = () => {
      if (imgRef.current) {
        setImageDimensions({
          width: imgRef.current.naturalWidth,
          height: imgRef.current.naturalHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleClick = (e, area) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = area.file;
    link.download = area.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scaleArea = (coords) => {
    if (!imgRef.current || imageDimensions.width === 0) return coords;
    const scaleX = imgRef.current.clientWidth / imageDimensions.width;
    const scaleY = imgRef.current.clientHeight / imageDimensions.height;

    return coords.map((coord, i) => (i % 2 === 0 ? coord * scaleX : coord * scaleY));
  };

  return (
    <div>
      <h1>{t('maps.ceneriMap')}</h1>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Mappa interattiva Ceneri"
          style={{ maxWidth: '100%', height: 'auto' }}
          onLoad={() => setImageDimensions({
            width: imgRef.current.naturalWidth,
            height: imgRef.current.naturalHeight,
          })}
        />
        {originalAreas.map((area, index) => {
          const scaledCoords = scaleArea(area.coords);
          return (
            <div
              key={index}
              onClick={(e) => handleClick(e, area)}
              style={{
                position: 'absolute',
                top: `${scaledCoords[1]}px`,
                left: `${scaledCoords[0]}px`,
                width: `${scaledCoords[2] - scaledCoords[0]}px`,
                height: `${scaledCoords[3] - scaledCoords[1]}px`,
                cursor: 'pointer',
                transition: 'background-color 0.3s ease', // Transizione per l'effetto hover
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MapsPage;
