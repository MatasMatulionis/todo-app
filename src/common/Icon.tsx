import Trash from "../assets/icons/trash-bin.svg";
import DotsHorizontal from "../assets/icons/dots-horizontal.svg";
import Edit from "../assets/icons/edit.svg";
import Plus from "../assets/icons/plus.svg";
import Arrowleft from "../assets/icons/arrow-left-from-line.svg";
import Cross from "../assets/icons/cross.svg";

import "./icon.scss";

type IconProps = {
  name: string;
};

const icons: Record<string, string> = {
  trash: Trash,
  dotsH: DotsHorizontal,
  edit: Edit,
  plus: Plus,
  arrowLwL: Arrowleft,
  cross: Cross,
};

const Icon = ({ name }: IconProps) => {
  const src = icons[name];

  if (!src) {
    return null;
  }

  return <img className="icon" src={src} alt={`${name} icon`} />;
};

export default Icon;
