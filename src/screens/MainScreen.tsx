import { useState, useMemo, useRef, useEffect } from "react";
import FavouriteBtn from "../components/FavouriteBtn";
import { Motto } from "../data/data";

export default function MainScreen(props: {
  shuffledMottos: Motto[],
  onLikeBtnPressed: (mottoId: number) => void,
  favouriteIds: Set<number>,
}) {
  const [mottoIndex, setMottoIndex] = useState<number>(0);
  const motto = useMemo<Motto>(() => props.shuffledMottos[mottoIndex], [mottoIndex, props.shuffledMottos]);
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const onLikeBtnPressed = () => {
    props.onLikeBtnPressed(motto.id);
  }

  const nextMotto = (next: Boolean = true) => {
    if (lockRef.current) return;
    lockRef.current = true;

    setMottoIndex(prev => {
      if (!next && prev <= 0) {
        return props.shuffledMottos.length - 1;
      } else if (next && prev === props.shuffledMottos.length - 1) {
        return 0;
      } else {
        return prev + (next ? 1 : -1);
      }
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
    <div className="h-[calc(100svh-6rem)] max-h-[calc(100svh-6rem)] justify-center items-center flex flex-col box-border mx-10 mt-16 mb-8 overflow-hidden">
      <div
        className='flex flex-col items-center justify-center flex-1 gap-6 text-center'>
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
        </div>
        <FavouriteBtn
          onClick={onLikeBtnPressed}
          isSelected={props.favouriteIds.has(motto.id)}
        />
      </div>
    </div>
  )
}