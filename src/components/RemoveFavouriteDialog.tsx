import { Ref } from "react"
import { Motto } from "../data/data"

export default function RemoveFavouriteDialog(props: {
  dialogRef: Ref<HTMLDialogElement>,
  motto: Motto | null | undefined,
  onCancel: () => void,
  onOk: () => void,
}) {
  return <dialog
    ref={props.dialogRef}
    className="p-8 rounded-lg backdrop:bg-black backdrop:opacity-30">
    <div className="flex flex-col gap-2">
      <b>いいねを解除しますか？</b>
      <span className="p-4 text-center">{props.motto?.text}</span>
      <div className="flex justify-center gap-2">
        <button
          onClick={props.onCancel}
          className="w-32 p-2 border rounded-md">キャンセル</button>
        <button
          onClick={props.onOk}
          className="w-32 p-2 text-white bg-gray-700 rounded-md">OK</button>
      </div>
    </div>
  </dialog>
}