import Trash from "../assets/icons/trash-bin.svg";
import DotsHorizontal from "../assets/icons/dots-horizontal.svg";
import Edit from "../assets/icons/edit.svg";

type IconProps = {
  name: string;
};

const icons: Record<string, string> = {
  trash: Trash,
  dotsH: DotsHorizontal,
  edit: Edit,
};

const Icon = ({ name }: IconProps) => {
  const src = icons[name];

  if (!src) {
    return null;
  }

  return <img src={src} alt={`${name} icon`} />;
};

export default Icon;
