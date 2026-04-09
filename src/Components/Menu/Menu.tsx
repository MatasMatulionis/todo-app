import { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import CreateListModal from "../Templates/CreateList";
import CreateTaskModal from "../Templates/CreateTask";

import "./styles.scss";

const Menu = () => {
  const [openedCreateListModal, setOpenedCreateListModal] = useState(false);
  const [openedCreateTaskModal, setOpenedCreateTaskModal] = useState(false);
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    getLists();
  }, []);

  //JSON.stringify(list)

  //List
  function getLists() {
    window.electronAPI.getLists().then(setLists);
  }

  function CreateList(name: string, color: string) {
    window.electronAPI.addList(name, color);
    getLists();
  }

  function deleteList(id: number) {
    window.electronAPI.deleteList(id);
    getLists();
  }

  //Task
  function getTasks() {
    window.electronAPI.getTasks(lists[0].id).then(console.log);
  }

  function CreateTask(
    mainMode: boolean,
    title: string,
    description: string | null,
    priority: number | null,
    status: number | null,
    progress: number | null,
    listId: number | null,
    startedAt: number | null,
    deadlineAt: number | null,
  ) {
    window.electronAPI.addTask(
      mainMode,
      title,
      description,
      priority,
      status,
      progress,
      listId,
      startedAt,
      deadlineAt,
    );
    // getTasks();
  }

  return (
    <aside>
      <div className="single-row-spaced-out">
        <h1 onClick={() => getTasks()}>Todo.</h1>
        {/* <button className="icon-button">
          <Icon name="arrowLwL" />
        </button> */}
      </div>
      <section className="task">
        <div className="single-row-spaced-out">
          <h2>TASKS</h2>
          <button
            className="icon-button small"
            onClick={() => setOpenedCreateTaskModal(true)}
          >
            <Icon name="plus" />
          </button>
        </div>
        <button>
          <p>Due Soon</p>
        </button>
        <button>
          <p>Upcoming Soon</p>
        </button>
        <button>
          <p>Completed</p>
        </button>
        <button>
          <p>Overdue</p>
          <span>2</span>
        </button>
      </section>
      <section className="list">
        <div className="single-row-spaced-out">
          <h2>LISTS</h2>
          <button
            className="icon-button small"
            onClick={() => setOpenedCreateListModal(true)}
          >
            <Icon name="plus" />
          </button>
        </div>
        {lists.map((list, index) => (
          <button className="item" key={index}>
            <p title={list.title}>{list.title}</p>
            <div className="color" style={{ backgroundColor: list.color }} />
            {/* <button className="icon-button option margin-left">
              <Icon name="edit" />
            </button>
            <button
              onClick={() => deleteList(list.id)}
              className="icon-button option"
            >
              <Icon name="trash" />
            </button> */}
          </button>
        ))}
      </section>
      {openedCreateListModal && (
        <CreateListModal
          onClose={() => setOpenedCreateListModal(false)}
          onCreate={(name, color) => {
            setOpenedCreateListModal(false);
            CreateList(name, color);
          }}
        />
      )}
      {openedCreateTaskModal && (
        <CreateTaskModal
          onClose={() => setOpenedCreateTaskModal(false)}
          onCreate={(
            mainMode,
            title,
            description,
            priority,
            status,
            process,
            listId,
            startedDay,
            deadlineDay,
          ) => {
            setOpenedCreateTaskModal(false);
            CreateTask(
              mainMode,
              title,
              description,
              priority,
              status,
              process,
              listId,
              startedDay,
              deadlineDay,
            );
          }}
          lists={lists}
        />
      )}
    </aside>
  );
};

export default Menu;
