import { useState, useEffect, useRef } from "react";

import "./custom_dropdown.scss";

type CustomDropdownProps<T> = {
  options: T[];
  value: number | null;
  valueKey: keyof T;
  labelKey: keyof T;
  onChange: (id: number | null) => void;
  placeholder?: string;
  allowNone?: boolean;
  noneLabel?: string;
};

export function CustomDropdown<T>({
  options,
  value,
  valueKey,
  labelKey,
  onChange,
  placeholder = "Select option",
  allowNone = true,
  noneLabel = "None",
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o[valueKey] === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="trigger"
        onClick={() => setOpen((o) => !o)}
      >
        {value === null
          ? noneLabel
          : selected
            ? String(selected[labelKey])
            : placeholder}
      </button>

      {open && (
        <ul className="menu" role="listbox">
          {allowNone && (
            <li
              role="option"
              aria-selected={value === null}
              className={value === null ? "active" : ""}
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
            >
              {noneLabel}
            </li>
          )}

          {options.map((opt, i) => (
            <li
              key={String(opt[valueKey])}
              role="option"
              aria-selected={opt[valueKey] === value}
              className={value === opt[valueKey] ? "active" : ""}
              onClick={() => {
                onChange(opt[valueKey] as number);
                setOpen(false);
              }}
            >
              {String(opt[labelKey])}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default CustomDropdown;
