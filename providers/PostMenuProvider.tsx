import { createContext, ReactChild, ReactChildren, ReactNode, useState } from 'react';

export type PostMenuContextProps = {
  isOpen: boolean;
  toggleState: (isOpen: boolean) => void;
  isEditOpen: boolean;
  toggleEditState: (isEditOpen: boolean) => void;
  isDeleteOpen: boolean;
  toggleDeleteState: (isDeleteOpen: boolean) => void;
};

export const PostMenuContext = createContext<PostMenuContextProps>({} as PostMenuContextProps);

const PostMenuProvider = ({ children }: { children: ReactChild | ReactChildren | ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  return (
    <PostMenuContext.Provider
      value={{ isOpen, toggleState: setIsOpen, isEditOpen, toggleEditState: setIsEditOpen, isDeleteOpen, toggleDeleteState: setIsDeleteOpen }}
    >
      {children}
    </PostMenuContext.Provider>
  );
};

export default PostMenuProvider;
