const LOCAL_STORAGE_FAVOURITES = "favourites";

export function getFavourites(): Set<number> {
  var favourites = localStorage.getItem(LOCAL_STORAGE_FAVOURITES);
  return favourites === null ? new Set() : new Set(favourites.split(",").map(x => parseInt(x)));
}

export function addFavourite(id: number) {
  var favourites = getFavourites();
  favourites.add(id);
  saveFavouritesToStorage(favourites);
}

export function removeFavourite(id: number) {
  var favourites = getFavourites();
  favourites.delete(id);
  saveFavouritesToStorage(favourites);
}

export function saveFavouritesToStorage(favourites: Set<number>) {
  localStorage.setItem(LOCAL_STORAGE_FAVOURITES, Array.from(favourites).join(","));
}