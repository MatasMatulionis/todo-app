import { useState, useEffect, useRef } from "react";

import "./custom_dropdown.scss";

type CustomDropdownProps<T> = {
  options: T[];
  value: number | null | undefined;
  valueKey: keyof T;
  labelKey: keyof T;
  onChange: (id: number | null | undefined) => void;
  onOpen?: () => void;
  placeholder?: string;
  allowNone?: boolean;
  noneLabel?: string;
  noneState?: null | undefined;
};

export function CustomDropdown<T>({
  options,
  value,
  valueKey,
  labelKey,
  onChange,
  onOpen,
  placeholder = "Select option",
  allowNone = true,
  noneLabel = "None",
  noneState,
}: CustomDropdownProps<T>) {
  noneState = noneState !== undefined ? null : undefined;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && onOpen !== undefined) onOpen();
  }, [open]);

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
        {value === noneState
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
              aria-selected={value === noneState}
              className={value === noneState ? "active" : ""}
              onClick={() => {
                onChange(noneState);
                setOpen(false);
              }}
            >
              {noneLabel}
            </li>
          )}

          {options.map((opt, _) => (
            <li
              key={String(opt[valueKey])}
              role="option"
              aria-selected={opt[valueKey] === value}
              className={value === opt[valueKey] ? "active" : ""}
              onClick={() => {
                onChange(opt[valueKey] as number | null);
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
