export default function Icon (props: {
  src: string,
  alt: string,
}) {
  return <img
    src={props.src}
    alt={props.alt}
    className="w-6 h-6"
    />
}