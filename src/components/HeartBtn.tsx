import { ICON } from "../data/icons";
import IconBtn from "./IconBtn";

export default function HeartBtn(props: {
  onClick: () => void,
  isSelected: boolean,
  alt: string,
}) {
  return <IconBtn
    onClick={props.onClick}
    alt={props.alt}
    src={props.isSelected ? ICON.favourite_filled : ICON.favourite_outline}
  />
}