import { useEffect, useState } from 'react';

const TypingAnimation = ({ baseText, textsToAnimate }: { baseText: string; textsToAnimate: string[] }) => {
  const [words] = useState(textsToAnimate);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prevState) => (prevState + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prevState) => (reverse ? prevState - 1 : prevState + 1));
    }, Math.max(reverse ? 175 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [words, index, subIndex, reverse]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((prevState) => !prevState);
    }, 750);

    return () => clearTimeout(timeout);
  }, [blink]);
  return (
    <p className="font-bebas text-7xl w-full text-left">
      {baseText} {words[index].substring(0, subIndex)}
      {blink ? '|' : ''}
    </p>
  );
};

export default TypingAnimation;
