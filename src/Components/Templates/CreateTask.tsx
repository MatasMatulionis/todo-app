import { useState, useEffect } from "react";
import CustomDropdown from "../../common/CustomDropdown";
import CustomCalender from "../../common/CustomCalender";

import "./create_task.scss";

type Props = {
  onCreate: (
    title: string,
    description: string | null,
    priority: number | null,
    status: number | null,
    listId: number | null,
  ) => void;
  onClose: () => void;
  lists: any[];
};

const CreateTaskModal = ({ onCreate, onClose, lists }: Props) => {
  const [taskType, setTaskType] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [priority, setPriority] = useState<number | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [listId, setListId] = useState<number | null>(null);
  const [startedDay, setStartedDay] = useState<number | null>(null);
  const [deadlineDay, setDeadlineDay] = useState<number | null>(null);

  const setDateBoth = (value: number | null) => {
    setStartedDay(value);
    setDeadlineDay(value);
  };

  const STATUSES = [
    { id: 0, name: "Todo" },
    { id: 1, name: "In Progress" },
    { id: 2, name: "Blocked" },
    { id: 3, name: "Done" },
  ];

  const PRIORITIES = [
    { id: 0, name: "None", color: "#545454" },
    { id: 1, name: "Low", color: "#8ca94a" },
    { id: 2, name: "Medium", color: "#d2953f" },
    { id: 3, name: "High", color: "#ad3535" },
    { id: 4, name: "Extreme", color: "#ad468d" },
    { id: 5, name: "Critical", color: "#5b4ac9" },
  ];

  const STREAKS = [
    { id: 0, name: "Day" },
    { id: 1, name: "Week" },
    { id: 2, name: "Month" },
    { id: 3, name: "Year" },
  ];

  type TaskOption<T extends string | number> = {
    name: string;
    on: boolean;
    saved: boolean;
    setValue: React.Dispatch<React.SetStateAction<any | null>>;
    default: T;
  };

  const [simpleTaskOptions, setSimpleTaskOptions] = useState<
    (TaskOption<string> | TaskOption<number>)[]
  >([
    {
      name: "Description",
      on: false,
      saved: true,
      setValue: setDescription,
      default: "",
    },
    {
      name: "Date",
      on: false,
      saved: true,
      setValue: setDateBoth,
      default: Date.now(),
    },
    {
      name: "List",
      on: false,
      saved: true,
      setValue: setListId,
      default: 0,
    },
    {
      name: "Status",
      on: false,
      saved: true,
      setValue: setStatus,
      default: 0,
    },
    {
      name: "Priority",
      on: false,
      saved: true,
      setValue: setPriority,
      default: 0,
    },
    {
      name: "Progress",
      on: false,
      saved: true,
      setValue: setProgress,
      default: 0,
    },
  ]);

  const handleCreate = () => {
    if (!name.trim()) {
      setNameError("Title is empty");
      return;
    }
    onCreate(name, description, priority, status, listId);
  };

  const toggleOption = (name: string) => {
    setSimpleTaskOptions((prev) =>
      prev.map((option) =>
        option.name === name
          ? { ...option, on: !option.on, saved: !option.saved }
          : option,
      ),
    );
  };

  const isVisible = (name: string) =>
    simpleTaskOptions.some((o) => o.name === name && o.on === o.saved);

  const allOff = simpleTaskOptions.filter((o) => o.saved === o.on).length;

  const saveOptions = () => {
    simpleTaskOptions.forEach((o) => {
      o.setValue(o.on ? o.default : null);
    });

    setSimpleTaskOptions((prev) =>
      prev.map((option) => ({
        ...option,
        saved: true,
      })),
    );
  };

  return (
    <div
      className={`backdrop-task ${taskType ? "theme-orange" : "theme-green"}`}
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>CREATE NEW TASK</h1>
        <button
          onClick={() => setTaskType((e) => !e)}
          className="special-button"
        >
          <span className="text">Simple Task</span>
          <span className="text">Streak Task</span>
          <div className={`moving-bg ${taskType}`}></div>
        </button>
        <div className="text-field">
          <h2>Title*</h2>
          {nameError && <span className="error">{nameError}</span>}
          <input
            className={nameError ? "error-input" : ""}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(null);
            }}
            placeholder=""
          />
        </div>
        <div className="text-field">
          <h2>What else..?</h2>
          <div className="row priority no-color">
            {simpleTaskOptions.map((value, index) => (
              <button
                onClick={() => {
                  toggleOption(value.name);
                }}
                key={index}
                className={
                  simpleTaskOptions.some((o) => o.name === value.name && o.on)
                    ? "active"
                    : ""
                }
              >
                {value.name}
              </button>
            ))}
            <button
              onClick={() => {
                saveOptions();
              }}
              className="save-button"
            >
              Update
            </button>
          </div>
        </div>
        <div className="optional">
          {isVisible("Description") && (
            <div className="text-field">
              <h2>Description</h2>
              <textarea
                rows={5}
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                placeholder=""
              />
            </div>
          )}
          {isVisible("Date") && (
            <div className="row">
              <div className="grid-row">
                <h2>Start date</h2>
                {startedDay !== null ? (
                  <CustomCalender
                    onCreate={(date) => {
                      setStartedDay(date);
                    }}
                    date={startedDay}
                  />
                ) : (
                  <div className="empty-fill"></div>
                )}
              </div>

              <div className="grid-row">
                <h2>Deadline date</h2>
                {deadlineDay !== null ? (
                  <CustomCalender
                    onCreate={(date) => {
                      setDeadlineDay(date);
                    }}
                    date={deadlineDay}
                  />
                ) : (
                  <div className="empty-fill"></div>
                )}
              </div>
            </div>
          )}
          {isVisible("List") || isVisible("Status") ? (
            <div className="row">
              {isVisible("List") && (
                <div className="custom-select">
                  <h2>List</h2>
                  <CustomDropdown
                    options={lists}
                    value={listId}
                    onChange={setListId}
                    valueKey="id"
                    labelKey="title"
                    allowNone={false}
                  />
                </div>
              )}
              {isVisible("Status") && (
                <div className="custom-select">
                  <h2>Status</h2>
                  <CustomDropdown
                    options={STATUSES}
                    value={status}
                    onChange={setStatus}
                    valueKey="id"
                    labelKey="name"
                    allowNone={false}
                  />
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {isVisible("Priority") && (
            <div className="text-field">
              <h2>Priority</h2>
              <div className="row priority">
                {PRIORITIES.map((value, index) => (
                  <button
                    onClick={() => {
                      setPriority(value.id);
                    }}
                    key={index}
                    style={{ backgroundColor: value.color }}
                    className={value.id === priority ? "active" : ""}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {isVisible("Progress") && (
            <div className="full-width">
              <div className="row between">
                <h2>Progress</h2>
                <h2>{(progress ?? 0) * 10}%</h2>
              </div>
              <input
                value={progress ?? 0}
                onChange={(e) => setProgress(Number(e.target.value))}
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="10"
              />
            </div>
          )}
          {taskType && (
            <>
              <div className="text-field">
                <h2>Streak Period</h2>
                <div className="row priority no-color">
                  <input className="in-priority" type="number"></input>
                  <h2>time(s) per</h2>
                  {STREAKS.map((value, index) => (
                    <button
                      onClick={() => {
                        setPriority(value.id);
                      }}
                      key={index}
                      className={value.id === priority ? "active" : ""}
                    >
                      {value.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="row">
                <div>
                  <h2>Streak Now</h2>
                  <input type="number"></input>
                </div>
                <div>
                  <h2>Streak Goal</h2>
                  <input type="number"></input>
                </div>
              </div>
            </>
          )}

          {!allOff && (
            <div className="row">
              <h2>Nothing to show here</h2>
            </div>
          )}
        </div>

        <div className="row">
          <button className="submit-button confirm" onClick={handleCreate}>
            Create
          </button>
          <button className="submit-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateTaskModal;
