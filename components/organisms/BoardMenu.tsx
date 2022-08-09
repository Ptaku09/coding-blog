import LogoAndName from '../atoms/LogoAndName';

const BoardMenu = () => {
  return (
    <div className="w-full h-screen flex justify-end">
      <div className="fixed w-60 h-full text-2xl p-4">
        <LogoAndName />
        <ul className="mt-5">
          <li>Bookmarks</li>
          <li>Toggle theme</li>
          <li>Add post</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default BoardMenu;
