import { useMemo, useRef, useState } from "react"
import { Motto } from "../data/data"
import FavouriteMotto from "../components/FavouriteMotto";
import SearchBar from "../components/SearchBar";
import RemoveFavouriteDialog from "../components/RemoveFavouriteDialog";

export default function FavouritesScreen (props: {
  onLikeBtnPressed: (mottoId: number) => void,
  favouriteIds: Set<number>,
  allMottos: Record<string, Motto>,
  removeFavourite: (motto: Motto) => void,
}) {
  var favourites = useMemo(
    () => { return Array.from(props.favouriteIds)
      .map(id => props.allMottos[id])},
    [props.favouriteIds]
  );

  var [searchTerm, setSearchTerm] = useState("");
  var [mottoToRemove, setMottoToRemove] = useState<Motto>();

  var filteredFavourites = useMemo(() => {
    return favourites.filter(motto => {
      var lowerCaseSearchTerm = searchTerm.toLowerCase();
      return motto.scene?.toLowerCase().includes(lowerCaseSearchTerm) ||
        motto.author?.toLowerCase().includes(lowerCaseSearchTerm) ||
        motto.text.toLowerCase().includes(lowerCaseSearchTerm)}
    )
  }, [searchTerm, favourites]);

  const onRemoveBtnPressed = (motto: Motto) => {
    setMottoToRemove(motto);
    dialogRef.current?.showModal();
  }

  const onRemoveDialogCancel = () => {
    setMottoToRemove(undefined);
    dialogRef.current?.close();
  }

  const onRemoveDialogOk = () => {
    if (!mottoToRemove) return;
    props.removeFavourite(mottoToRemove);
    setMottoToRemove(undefined);
    dialogRef.current?.close();
  }

  const dialogRef = useRef<HTMLDialogElement>(null);
  
  return (
    <div
      className='max-h-[calc(100svh-6rem)] flex flex-col box-border mx-10 mt-16 mb-8 overflow-hidden'>
      <div className="p-1">
        <SearchBar onContentChange={setSearchTerm}/>
      </div>
      <div className="flex flex-col flex-1 min-h-0 gap-6 p-1 overflow-auto">
        {
        filteredFavourites.map( motto => 
        <FavouriteMotto
          key={motto.id}
          motto={motto}
          onRemove={() => onRemoveBtnPressed(motto)}
        />)
      }
      </div>
      <RemoveFavouriteDialog
        dialogRef={dialogRef}
        motto={mottoToRemove}
        onCancel={onRemoveDialogCancel}
        onOk={onRemoveDialogOk}
      />
    </div>
  )
}