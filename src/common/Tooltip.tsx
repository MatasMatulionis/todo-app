import "./tooltip.scss";

type Props = {
  text: string;
};

export function Tooltip({ text }: Props) {
  return (
    <div className="tooltip">
      <div className="appear-text">{text}</div>
      <span>!</span>
    </div>
  );
}
export default Tooltip;
