import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Globe = typeof window !== 'undefined' ? require('react-globe.gl').default : () => null;

type arcsData = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

const AnimatedGlobe = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [globeMaterial, setGlobeMaterial] = useState(new THREE.MeshPhongMaterial());
  const [arcs, setArcs] = useState([] as arcsData[]);
  const globeRef = useRef() as any;

  useEffect(() => {
    // load data
    fetch('/globe-data.json')
      .then((res) => res.json())
      .then(setCountries);

    const isMobile = window.innerWidth < 768;

    // set initial params
    globeRef.current.controls().enableZoom = false;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.65;
    globeRef.current.camera().fov = isMobile ? 60 : 45;
    globeRef.current.camera().position.set(globeRef.current.camera().position.x, 150, globeRef.current.camera().position.z);
    setGlobeMaterial(new THREE.MeshPhongMaterial({ color: 0x474ed6, shininess: 0.5 }));

    // set arcs
    const arcs = [] as arcsData[];
    for (let i = 0; i < 15; i++)
      arcs.push({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
      });

    setArcs(arcs);
  }, []);

  return (
    <Globe
      animateIn={false}
      backgroundColor="rgba(0, 0, 0, 0)"
      globeMaterial={globeMaterial}
      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.7}
      hexPolygonColor={() => 0xffffff}
      atmosphereColor={'#a5d6fe'}
      atmosphereAltitude={0.3}
      arcsData={arcs}
      arcStroke={0.8}
      arcColor={() => '#e967ba'}
      arcDashLength={1}
      arcDashGap={0.05}
      arcDashAnimateTime={5000}
      ref={globeRef}
    />
  );
};

export default AnimatedGlobe;
