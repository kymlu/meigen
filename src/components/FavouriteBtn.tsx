import HeartBtn from "./HeartBtn";

export default function FavouriteBtn(props: {
  onClick: () => void,
  isSelected: boolean
}) {
  return <HeartBtn
    onClick={props.onClick}
    isSelected={props.isSelected}
    alt={props.isSelected ? "いいね削除" : "いいね追加"}
    />
}