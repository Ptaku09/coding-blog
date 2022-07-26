import { Dispatch, SetStateAction, useState } from 'react';

const useLimitedCheckboxes: (
  dataSize: number,
  limit: number
) => {
  checkedState: boolean[];
  setCheckedState: Dispatch<SetStateAction<boolean[]>>;
  setCurrentlyChecked: Dispatch<SetStateAction<number>>;
  onCheckboxChange: (position: number) => void;
} = (dataSize: number, limit: number) => {
  const [checkedState, setCheckedState] = useState(new Array(dataSize).fill(false));
  const [currentlyChecked, setCurrentlyChecked] = useState(0);

  const onCheckboxChange = (position: number) => {
    const updatedCheckedState = checkedState.map((state: boolean, index: number) => {
      if (index === position && state) {
        setCurrentlyChecked((prevState: number) => prevState - 1);
        return false;
        // limit - max number of hashtags
      } else if (index === position && currentlyChecked < limit) {
        setCurrentlyChecked((prevState: number) => prevState + 1);
        return true;
      }

      return state;
    });

    setCheckedState(updatedCheckedState);
  };

  return {
    checkedState,
    setCheckedState,
    setCurrentlyChecked,
    onCheckboxChange,
  };
};

export default useLimitedCheckboxes;
