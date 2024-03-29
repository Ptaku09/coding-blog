import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshPhongMaterial } from 'three';

const Globe = typeof window !== 'undefined' ? require('react-globe.gl').default : () => null;

type arcsData = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

const AnimatedGlobe = () => {
  const [countries, setCountries] = useState<{ features: string[] }>({ features: [] });
  const [globeMaterial, setGlobeMaterial] = useState<MeshPhongMaterial>(new THREE.MeshPhongMaterial());
  const [arcs, setArcs] = useState<arcsData[]>([]);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    // load data
    fetch('/globe-data.json')
      .then((res) => res.json())
      .then(setCountries);

    // set initial params
    if (globeRef.current) {
      globeRef.current.controls().enableZoom = false;
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.65;
      globeRef.current.camera().fov = 40;
      globeRef.current.camera().position.set(globeRef.current.camera().position.x, 150, globeRef.current.camera().position.z);
    }

    setGlobeMaterial(new THREE.MeshPhongMaterial({ color: 0x474ed6, shininess: 0.5 }));

    // set arcs
    const arcs: arcsData[] = [];

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
      height={600}
      width={700}
      ref={globeRef}
    />
  );
};

export default AnimatedGlobe;
