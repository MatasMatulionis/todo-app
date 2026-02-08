import { useState, useEffect } from "react";

import "./create_list.scss";

type Props = {
  onCreate: (name: string, color: string) => void;
  onClose: () => void;
};

const CreateListModal = ({ onCreate, onClose }: Props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [error, setError] = useState<string | null>(null);

  const [colorsGenerated, setColorsGenerated] = useState(() =>
    generateColors(),
  );

  function generateColors(count = 4) {
    const colors = [];

    const baseHue = Math.random() * 360;
    const variety = rand(30, 120);

    for (let i = 0; i < count; i++) {
      const hue = (baseHue + i * variety) % 360;

      const saturation = rand(25, 90);
      const lightness = rand(20, 85);

      colors.push(hslToHex(hue, saturation, lightness));
    }

    return colors;
  }

  function rand(min: any, max: any) {
    return min + Math.random() * (max - min);
  }

  function hslToHex(h: any, s: any, l: any) {
    s /= 100;
    l /= 100;

    const k = (n: any) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: any) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const toHex = (x: any) =>
      Math.round(255 * x)
        .toString(16)
        .padStart(2, "0");

    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  }

  return (
    <div className="backdrop-list" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>CREATE NEW LIST</h1>
        <div>
          <h2>Title</h2>
          {error && <span className="error">{error}</span>}
          <input
            className={error ? "error-input" : ""}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            placeholder=""
          />
        </div>
        <div>
          <h2>Color</h2>
          <div className="row">
            <div>
              {colorsGenerated.map((color, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    setColor(color);
                  }}
                />
              ))}
            </div>
            <input
              className="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="color"
            />
          </div>
          <a
            onClick={() => {
              setColorsGenerated(generateColors());
            }}
          >
            Regenerate
          </a>
        </div>

        <button
          className="confirm"
          onClick={() =>
            name !== "" ? onCreate(name, color) : setError("Title is empty")
          }
        >
          Create
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
export default CreateListModal;
