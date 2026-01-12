import { useState, useMemo, useRef, useEffect } from "react";
import FavouriteBtn from "../components/FavouriteBtn";
import { Motto } from "../data/data";

export default function MainScreen(props: {
  shuffledMottos: Motto[],
  onLikeBtnPressed: (mottoId: number) => void,
  favouriteIds: Set<number>,
  mottoIndex: number,
  changeMottoIndex: (next: boolean) => void,
}) {
  const motto = useMemo<Motto>(
    () => props.shuffledMottos[props.mottoIndex],
    [props.mottoIndex, props.shuffledMottos]
  );
  
  const lockRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const onLikeBtnPressed = () => {
    props.onLikeBtnPressed(motto.id);
  }

  const nextMotto = (next: boolean = true) => {
    if (lockRef.current) return;
    lockRef.current = true;
    props.changeMottoIndex(next);
    setTimeout(() => {
      lockRef.current = false;
    }, 75);
  }

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (lockRef.current) return;
      touchStartX.current = e.touches[0].clientX;
    }

    window.addEventListener('touchstart', onTouchStart);
    
    const onTouchEnd = (e: TouchEvent) => {
      if (lockRef.current) return;
      if (touchStartX.current === null) return;

      const endX = e.changedTouches[0].clientX;
      const deltaX = touchStartX.current - endX; // + = swipe left

      const SWIPE_THRESHOLD = 50;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
      
      if (deltaX > 0) {
        nextMotto();
      } else {
        nextMotto(false);
      }

      touchStartX.current = null;
    };

    window.addEventListener('touchend', onTouchEnd);

    const onKeyUp = (e: KeyboardEvent) => {
      if (lockRef.current) return;
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
        className='py-2 overflow-auto text-center'>
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          <div className='text-2xl'>
            {motto.text}
          </div>
          <div className='flex flex-col items-center justify-center h-full gap-1 align-middle'>
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
    </div>
  )
}