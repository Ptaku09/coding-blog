import { useEffect, useRef, useState } from 'react';

const Globe = typeof window !== 'undefined' ? require('react-globe.gl').default : () => null;

const AnimatedGlobe = () => {
  const [countries, setCountries] = useState({ features: [] });
  const globeRef = useRef() as any;

  useEffect(() => {
    globeRef.current.controls().enableZoom = false;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.5;
  }, []);

  const loadData = () => {
    fetch('/globe-data.json')
      .then((res) => res.json())
      .then(setCountries);
  };

  return (
    <div>
      <Globe
        animateIn={true}
        waitForGlobeReady={true}
        onGlobeReady={loadData}
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        hexPolygonColor={() => '#ffffff'}
        ref={globeRef}
      />
    </div>
  );
};

export default AnimatedGlobe;
