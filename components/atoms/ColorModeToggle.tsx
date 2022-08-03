import { useTheme } from 'next-themes';
import lightMode from '../../public/icons/light-mode.svg';
import darkMode from '../../public/icons/dark-mode.svg';
import Image from 'next/image';

const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme();

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
