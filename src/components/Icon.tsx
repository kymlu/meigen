export default function Icon (props: {
  src: string,
  alt: string,
}) {
  return <img
    src={props.src}
    alt={props.alt}
    className="w-10 h-10"
    />
}