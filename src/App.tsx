import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { mainMottoList, Motto } from './data/data';
import { shuffle } from './GlobalHelper';
import Icon from './components/Icon';
import { ICON } from './data/icons';

function App() {
  const [mottoIndex, setMottoIndex] = useState<number>(0);
  const mottoList = useMemo(() => shuffle([...mainMottoList]), []);
  const motto = useMemo<Motto>(() => mottoList[mottoIndex], [mottoIndex, mottoList]);
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const nextMotto = (next: Boolean = true) => {
    if (lockRef.current) return;
    lockRef.current = true;

    setMottoIndex(prev => {
      if ((!next && prev <= 0) || (next && prev === mottoList.length - 1)) return prev;
      
      return prev + (next ? 1 : -1);
    });

    setTimeout(() => {
      lockRef.current = false;
    }, 75);
  }

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    }

    window.addEventListener('touchstart', onTouchStart);
    
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const endY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - endY; // + = swipe up

      const SWIPE_THRESHOLD = 50;

      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      
      if (deltaY > 0) {
        nextMotto();
      } else {
        nextMotto(false);
      }

      touchStartY.current = null;
    };

    window.addEventListener('touchend', onTouchEnd);

    const onKeyUp = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'ArrowRight', ' '].includes(e.key)) {
        nextMotto();
      } else if (['ArrowUp', 'ArrowLeft', "PageUp"].includes(e.key)) {
        nextMotto(false);
      }
    }
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keyup", onKeyUp);
    }
  }, []);

  return (
    <div
      className='flex flex-col items-center justify-center w-screen h-screen gap-6 px-10 font-serif text-center'>
      <div className='text-5xl'>
        {motto.text}
      </div>
      <div className='flex flex-col items-center justify-center gap-1 align-middle'>
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
        <Icon src={ICON.favourite_outline}/>
      </div>
    </div>
  );
}

export default App;
