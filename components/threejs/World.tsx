import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
});

// let Globe = () => null;
// if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;

export const World = () => {
  const [countries, setCountries] = useState({ features: [] });
  const globeRef = useRef() as any;

  useEffect(() => {
    globeRef.current!.controls().enableZoom = false;
    globeRef.current!.controls().autoRotate = true;
  }, []);

  const loadData = () => {
    // load data
    fetch('/globe-data-min.json')
      .then((res) => res.json())
      .then(setCountries);
  };

  return (
    <div>
      {typeof window === 'undefined' ? null : (
        <Globe
          ref={globeRef}
          animateIn={true}
          waitForGlobeReady={true}
          onGlobeReady={loadData}
          showAtmosphere={true}
          atmosphereAltitude={0.25}
          atmosphereColor={'#ffffee'}
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.7}
          hexPolygonColor={() => '#ffffff'}
        />
      )}
    </div>
  );
};
