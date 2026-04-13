import { useState, useEffect, useRef } from "react";

import "./custom_calender.scss";

type CustomCalenderProps<T> = {
  onCreate: (id: number | null) => void;
  date: number | null;
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDay(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function CustomCalender<T>({ onCreate, date }: CustomCalenderProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  function timeToString(date: number) {
    var curr = new Date(date);
    var str = curr.getFullYear().toString() + "-";

    if (curr.getMonth() < 9) {
      str += "0" + (curr.getMonth() + 1).toString() + "-";
    } else {
      str += curr.getMonth().toString() + "-";
    }

    if (curr.getDate() < 10) {
      str += "0" + curr.getDate().toString();
    } else {
      str += curr.getDate().toString();
    }

    return str;
  }

  return (
    <div className="calendar-wrapper" ref={dropdownRef}>
      <button className="calendar-trigger" onClick={() => setOpen((o) => !o)}>
        {date !== null ? timeToString(date) : "Not set"}
      </button>

      {open && (
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={prevMonth} className="nav-btn">
              ‹
            </button>

            <div className="calendar-title">
              {new Date(year, month).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </div>

            <button onClick={nextMonth} className="nav-btn">
              ›
            </button>
          </div>

          <div className="calendar-weekdays">
            {daysOfWeek.map((d) => (
              <div key={d} className="weekday">
                {d}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="day empty" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              return (
                <div
                  key={day}
                  className={`day ${isToday ? "today" : ""} ${new Date(year, month, day).getTime() === date ? "selected" : ""}`}
                  onClick={() => {
                    const selectedDate = new Date(year, month, day).getTime();
                    onCreate(selectedDate);
                    setOpen(false);
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomCalender;
