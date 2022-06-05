import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';

const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeColorMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return theme === 'dark' ? (
    <FontAwesomeIcon onClick={handleChangeColorMode} icon={faLightbulb} />
  ) : (
    <FontAwesomeIcon onClick={handleChangeColorMode} icon={faMoon} />
  );
};

export default ColorModeToggle;
