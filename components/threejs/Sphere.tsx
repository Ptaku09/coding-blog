import { useFrame, useLoader } from '@react-three/fiber';
import { MutableRefObject, useRef, useState } from 'react';
import { BufferGeometry, Material, Mesh, TextureLoader } from 'three';

export const Sphere = () => {
  const ref: MutableRefObject<Mesh<BufferGeometry, Material> | null> = useRef(null);
  const [speed, setSpeed] = useState(0.03 as number);
  const colorMap = useLoader(TextureLoader, 'images/earthspec1k.jpg');

  useFrame(() => (ref.current!.rotation.y -= speed));

  return (
    <mesh ref={ref} onPointerEnter={() => setSpeed(0.01)} onPointerLeave={() => setSpeed(0.03)}>
      <pointLight position={[10, 10, -10]} />
      <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" map={colorMap} />
    </mesh>
  );
};
