import { useEffect, useState } from "react";
import CustomDropdown from "../../common/CustomDropdown";
import CustomCalender from "../../common/CustomCalender";

import "./styles.scss";

const TaskView = () => {
  const STATUSES = [
    { id: 0, name: "Todo" },
    { id: 1, name: "In Progress" },
    { id: 2, name: "Blocked" },
    { id: 3, name: "Done" },
  ];

  const PRIORITY = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: String(i + 1),
  })).reverse();

  const [calenderView, setCalenderView] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [lists, setLists] = useState<any[]>([]);

  const [listId, setListId] = useState<number | null | undefined>(undefined);
  const [status, setStatus] = useState<number | null | undefined>(undefined);
  const [priority, setPriority] = useState<number | null | undefined>(
    undefined,
  );
  const [startDay, setStartDay] = useState<number | undefined>(undefined);
  const [deadlineDay, setDeadlineDay] = useState<number | undefined>(undefined);

  useEffect(() => {
    getTasks();
  }, [listId, status, priority, startDay, deadlineDay]);

  //List
  function getLists() {
    window.electronAPI.getLists().then(setLists);
    console.log(lists);
  }

  //Task
  function getTasks() {
    window.electronAPI
      .getTasks({
        type: false,
        listId: listId,
        status: status,
        priority: priority,
        dueBefore: deadlineDay,
        startDay: startDay,
      })
      .then(setTasks);
  }

  return (
    <main>
      <button
        onClick={() => setCalenderView((e) => !e)}
        className={`special-button ${calenderView}`}
      >
        <span className="text">List View</span>
        <span className="text">Calender View</span>
        <div className="moving-bg"></div>
      </button>
      <section className="filter-row">
        <div>
          <h2>Lists</h2>
          <CustomDropdown
            options={[{ id: null, title: "Show non List" }, ...lists]}
            value={listId}
            onChange={setListId}
            onOpen={getLists}
            valueKey="id"
            labelKey="title"
            allowNone={true}
            noneLabel="Show All"
            noneState={undefined}
          />
        </div>
        <div>
          <h2>Status</h2>
          <CustomDropdown
            options={STATUSES}
            value={status}
            onChange={setStatus}
            valueKey="id"
            labelKey="name"
            allowNone={true}
            noneLabel="Show All"
            noneState={undefined}
          />
        </div>
        <div>
          <h2>Priority</h2>
          <CustomDropdown
            options={PRIORITY}
            value={priority}
            onChange={setPriority}
            valueKey="id"
            labelKey="name"
            allowNone={true}
            noneLabel="Show All"
            noneState={undefined}
          />
        </div>
        <div>
          <h2>Starts At/After</h2>
          <CustomCalender
            onCreate={(date) => {
              setStartDay(date === null ? undefined : date);
            }}
            date={startDay === undefined ? null : startDay}
            allowNull={true}
          />
        </div>
        <div>
          <h2>Due Before</h2>
          <CustomCalender
            onCreate={(date) => {
              setDeadlineDay(date === null ? undefined : date);
            }}
            date={deadlineDay === undefined ? null : deadlineDay}
          />
        </div>
      </section>
      {!calenderView ? (
        <div className="list-view">
          {tasks.map((task, index) => (
            <button key={index}>{task.title}</button>
          ))}
        </div>
      ) : (
        <div className="calender-view"></div>
      )}
    </main>
  );
};
export default TaskView;
