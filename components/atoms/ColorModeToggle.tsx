import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import lightMode from '../../public/icons/lightMode.svg';
import darkMode from '../../public/icons/darkMode.svg';
import Image from 'next/image';

const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState(faSun);

  useEffect(() => {
    theme === 'dark' ? setIcon(faMoon) : setIcon(faSun);
  }, [theme]);

  const handleChangeColorMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return theme === 'light' ? (
    <Image onClick={handleChangeColorMode} src={darkMode} width={25} height={25} alt="go to top" />
  ) : (
    <Image onClick={handleChangeColorMode} src={lightMode} width={25} height={25} alt="go to top" />
  );
};

export default ColorModeToggle;
