import { Motto } from "../data/data"
import { ICON } from "../data/icons"
import IconBtn from "./IconBtn"

export default function FavouriteMotto(props: {
  motto: Motto,
  onRemove: () => void
}) {
  return (
    <div className="flex flex-col w-full gap-2 p-6 text-left align-middle border-2 border-gray-700 rounded-md">
      <span>
        {props.motto.text}
      </span>
      {
        props.motto.author &&
        <span className="text-xs">
          {props.motto.author}
        </span>
      }
      {
        props.motto.scene &&
        <span className="text-xs">
          {props.motto.scene}
        </span>
      }
      <div className="absolute self-end">
        <IconBtn
          src={ICON.heart_minus}
          alt="いいね削除"
          onClick={props.onRemove}
        />
      </div>
    </div>
  )
}