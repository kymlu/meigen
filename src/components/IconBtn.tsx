import Icon from "./Icon";

export default function IconBtn(props: {
  onClick: () => void,
  src: string;
  alt: string,
}) {
  return <button onClick={props.onClick}>
      <Icon
        alt={props.alt}
        src={props.src}/>
    </button>
}