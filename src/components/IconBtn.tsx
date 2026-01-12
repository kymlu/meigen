import Icon from "./Icon";

export default function IconBtn(props: {
  onClick: () => void,
  src: string;
  alt: string,
}) {
  return <button
    className="w-6 h-6"
    onClick={props.onClick}>
      <Icon
        alt={props.alt}
        src={props.src}/>
    </button>
}