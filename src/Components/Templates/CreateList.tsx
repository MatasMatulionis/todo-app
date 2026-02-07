import { useState } from "react";

type Props = {
  onCreate: (name: string, color: string) => void;
  onClose: () => void;
};

const CreateListModal = ({ onCreate, onClose }: Props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  return (
    <div className="backdrop">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>x</button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="List name"
        />
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="color"
        />
        <button onClick={() => onCreate(name, color)}>Create</button>
      </div>
    </div>
  );
};
export default CreateListModal;
