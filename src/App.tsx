import './App.css';
import MainScreen from './screens/MainScreen';
import Header from './components/Header';
import { useMemo, useState } from 'react';
import { getFavourites, saveFavouritesToStorage } from './data/LocalStorageHelper';
import { mainMottoList, Motto } from './data/data';
import FavouritesScreen from './screens/FavouritesScreen';
import { shuffle } from './GlobalHelper';

export type AppMode = "all" | "favs";

function App() {
  const shuffledMottos = useMemo(() => {
    return shuffle(mainMottoList)
  }, []);

  const indexedMottos = useMemo(() => {
    return shuffledMottos.reduce((acc, item) => {
      const groupKey = item.id;
      acc[groupKey] = item; // overwrite if duplicate key
      return acc;
    }, {} as Record<string, Motto>);
  }, [shuffledMottos]);

  const [favourites, setFavourites] = useState<Set<number>>(getFavourites());
  const [appMode, setAppMode] = useState<AppMode>("all");
  
  const toggleLike = (mottoId: number) => {
    if (favourites.has(mottoId)) {
      console.log(`Remove from favourites:`, mottoId)
      setFavourites(prev => {
        const newSet = new Set(prev);
        newSet.delete(mottoId);
        saveFavouritesToStorage(newSet);
        return newSet;
      });
    } else {
      console.log(`Add to favourites:`, mottoId)
      setFavourites(prev => {
        prev.add(mottoId);
        saveFavouritesToStorage(prev);
        return prev;
      });
    }
  }

  const onHeartBtnClicked = () => {
    setAppMode("favs")
  }

  const onBackBtnClicked = () => {
    setAppMode("all");
  }

  return (
    <div className='font-serif text-gray-700'>
      <Header 
        appMode={appMode}
        onHeartBtnClicked={onHeartBtnClicked}
        onBackBtnClicked={onBackBtnClicked}/>
      {
        appMode === "all" &&
        <MainScreen
          shuffledMottos={shuffledMottos}
          favouriteIds={favourites}
          onLikeBtnPressed={(mottoId: number) => toggleLike(mottoId)}
        />
      }
      {
        appMode === "favs" &&
        <FavouritesScreen
          allMottos={indexedMottos}
          favouriteIds={favourites}
          onLikeBtnPressed={() => {}}
          removeFavourite={(motto) => {toggleLike(motto.id)}}
          />
      }
    </div>
  )
}

export default App;
