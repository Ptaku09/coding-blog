import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type UsePathDetectorReturnType = () => { currentPathName: string };

const UsePathDetector: UsePathDetectorReturnType = () => {
  const [currentPathName, setCurrentPathName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setCurrentPathName(router.pathname);
  }, [router.pathname]);

  return {
    currentPathName,
  };
};

export default UsePathDetector;
