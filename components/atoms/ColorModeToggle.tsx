import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState(faSun);

  useEffect(() => {
    theme === 'dark' ? setIcon(faMoon) : setIcon(faSun);
  }, [theme]);

  const handleChangeColorMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return <FontAwesomeIcon className="animate-appearing cursor-pointer" onClick={handleChangeColorMode} icon={icon} />;
};

export default ColorModeToggle;
