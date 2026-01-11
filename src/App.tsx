import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { mainMottoList, Motto } from './data/data';
import { shuffle } from './GlobalHelper';

function App() {
  const [motto, setMotto] = useState<Motto>({text: "", id: 9});
  const [mottoList, setMottoList] = useState<Motto[]>([]);
  const lockRef = useRef(false);

  useEffect(() => {
    randomMotto();
  }, []);

  const randomMotto = () => {
    if (lockRef.current) return;
    lockRef.current = true;

    setMottoList(prevList => {
      let list = prevList;

      if (list.length === 0) {
        list = shuffle(
          mainMottoList.filter(m => m.id !== motto.id)
        );
      }

      const next = list[list.length - 1];
      const remaining = list.slice(0, -1);

      setMotto(next);
      return remaining;
    });

    setTimeout(() => {
      lockRef.current = false;
    }, 75);
  }

  useEffect(() => {
    const onTouchEnd = () => {
      randomMotto();
    };

    window.addEventListener('touchend', onTouchEnd);

    const onKeyUp = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'ArrowRight', ' '].includes(e.key)) {
        randomMotto();
      }
    }
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keyup", onKeyUp);
    }
  }, []);

  return (
    <div
      className='flex flex-col items-center justify-center w-screen h-screen gap-6 px-10 text-center font-ZAS'>
      <div className='text-5xl'>
        {motto.text}
      </div>
      <div className=''>
        {
          motto.author &&
          <div>
            {motto.author}
          </div>
        }
        {
          motto.scene &&
          <div>
            {motto.scene}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
