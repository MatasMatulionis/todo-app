import { useState, useEffect } from "react";
import CustomDropdown from "../../common/CustomDropdown";
import CustomCalender from "../../common/CustomCalender";

import "./create_task.scss";

type Props = {
  onCreate: (
    title: string,
    description: string,
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
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number | null>(0);
  const [status, setStatus] = useState<number | null>(0);
  const [progress, setProgress] = useState<number>(0);
  const [listId, setListId] = useState<number | null>(null);
  const [startedDay, setStartedDay] = useState<number | null>(null);
  const [deadlineDay, setDeadlineDay] = useState<number | null>(null);

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
    { id: 0, name: "Day", color: "#d7741d" },
    { id: 1, name: "Week", color: "#d7741d" },
    { id: 2, name: "Month", color: "#d7741d" },
    { id: 3, name: "Year", color: "#d7741d" },
  ];

  const handleCreate = () => {
    if (!name.trim()) {
      setNameError("Title is empty");
      return;
    }
    onCreate(name, description, priority, status, listId);
  };

  return (
    <div
      className={`backdrop-task ${taskType ? "theme-orange" : "theme-green"}`}
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="grid-row">
          <label className="custom-checkbox">
            <h2>Start date</h2>
            <input
              type="checkbox"
              onClick={(e) => {
                (e.target as HTMLInputElement).checked
                  ? setStartedDay(Date.now())
                  : setStartedDay(null);
              }}
            />
            <span className="checkmark" />
          </label>
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
          <label className="custom-checkbox">
            <h2>Deadline date</h2>
            <input
              type="checkbox"
              onClick={(e) => {
                (e.target as HTMLInputElement).checked
                  ? setDeadlineDay(Date.now())
                  : setDeadlineDay(null);
              }}
            />
            <span className="checkmark" />
          </label>
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

        <h1>CREATE NEW TASK</h1>
        <button
          onClick={() => setTaskType((e) => !e)}
          className="special-button"
        >
          <span className="text">Timed Task</span>
          <span className="text">Streak Task</span>
          <div className={`moving-bg ${taskType}`}></div>
        </button>
        <div className="text-field">
          <h2>Title</h2>
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
          <h2>Description</h2>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=""
          />
        </div>
        {!taskType ? (
          <>
            <div className="row">
              <div className="custom-select">
                <h2>List</h2>
                <CustomDropdown
                  options={lists}
                  value={listId}
                  onChange={setListId}
                  valueKey="id"
                  labelKey="title"
                />
              </div>

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
            </div>

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
            <div className="full-width">
              <div className="row between">
                <h2>Progress</h2>
                <h2>{progress * 10}%</h2>
              </div>
              <input
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="10"
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-field">
              <h2>Streak Period</h2>
              <div className="row priority">
                <input className="in-priority" type="number"></input>
                <h2>time(s) per</h2>
                {STREAKS.map((value, index) => (
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
