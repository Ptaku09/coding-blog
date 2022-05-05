import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Globe = typeof window !== 'undefined' ? require('react-globe.gl').default : () => null;

const AnimatedGlobe = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [globeMaterial, setGlobeMaterial] = useState(null as THREE.MeshPhongMaterial | null);
  const globeRef = useRef() as any;

  useEffect(() => {
    // load data
    fetch('/globe-data.json')
      .then((res) => res.json())
      .then(setCountries);

    // set initial params
    globeRef.current.controls().enableZoom = false;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.65;
    globeRef.current.camera().fov = 70;

    setGlobeMaterial(new THREE.MeshPhongMaterial({ color: 0x474ed6, shininess: 0.5 }));

    // change light position
    setTimeout(() => {
      const directionalLight = globeRef.current.scene().children.find((obj3d: any) => obj3d.type === 'DirectionalLight');
      directionalLight && directionalLight.position.set(-3, 1.5, 1);
    });
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
      atmosphereAltitude={0.25}
      ref={globeRef}
    />
  );
};

export default AnimatedGlobe;
