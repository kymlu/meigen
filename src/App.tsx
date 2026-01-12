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
    setFavourites(prev => {
      const newSet = new Set(prev);
      if (favourites.has(mottoId)) {
        console.log(`Remove from favourites:`, mottoId)
        newSet.delete(mottoId);
      } else {
        console.log(`Add to favourites:`, mottoId)
        newSet.add(mottoId);
      }
      saveFavouritesToStorage(newSet);
      return newSet;
    });
  }

  const onFavouritesBtnClicked = () => {
    console.log("Go to favourites")
    setAppMode("favs");
  }

  const onBackBtnClicked = () => {
    console.log("Return to main page")
    setAppMode("all");
  }

  return (
    <div className='font-serif text-gray-700'>
      <Header 
        appMode={appMode}
        onFavouritesBtnClicked={onFavouritesBtnClicked}
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
