import { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import { Sphere } from '../components/threejs/Sphere';

const Threejs: NextPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Sphere />
      </Canvas>
    </div>
  );
};

export default Threejs;
