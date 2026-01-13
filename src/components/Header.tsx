import { AppMode } from "../App";
import { ICON } from "../data/icons";
import IconBtn from "./IconBtn";

export default function Header (props: {
  appMode: AppMode,
  onFavouritesBtnClicked: () => void,
  onBackBtnClicked: () => void,
}) {
  return <header className="absolute top-0 z-10 flex p-5">
    {
      props.appMode === "all" &&
      <IconBtn
        src={ICON.bookmark_heart}
        onClick={props.onFavouritesBtnClicked}
        alt="いいねを見る"
        />
    }
    {
      props.appMode === "favs" &&
      <IconBtn
        src={ICON.arrow_back_ios_new}
        onClick={props.onBackBtnClicked}
        alt="戻る"
      />
    }
  </header>
}