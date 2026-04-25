import { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import CreateListModal from "../Templates/CreateList";
import CreateTaskModal from "../Templates/CreateTask";

import "./styles.scss";

const Menu = () => {
  const [openedPanel, setOpenedPanel] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    getLists();
  }, []);

  //List
  function getLists() {
    window.electronAPI.getLists().then(setLists);
  }

  function EditList(id: number, name: string, color: string) {
    window.electronAPI.editList(id, name, color);
  }

  function CreateList(name: string, color: string) {
    window.electronAPI.addList(name, color);
    getLists();
  }

  function deleteList(id: number) {
    window.electronAPI.deleteList(id);
    getLists();
  }

  // Overdue Task Length

  // function getTasks() {
  //   window.electronAPI.getTasks({ listId: lists[0].id }).then(console.log);
  // }

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
        <h1>Todo.</h1>
      </div>
      <section className="task">
        <div className="single-row-spaced-out">
          <h2>TASKS</h2>
          <button
            className="icon-button small"
            onClick={() => setOpenedPanel({ state: 1 })}
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
        <button>
          <p>Keep the Streak</p>
        </button>
      </section>
      <section className="list">
        <div className="single-row-spaced-out">
          <h2>LISTS</h2>
          <button
            className="icon-button small"
            onClick={() => setOpenedPanel({ state: 3 })}
          >
            <Icon name="plus" />
          </button>
        </div>
        {lists.map((list, index) => (
          <button className="item" key={index}>
            <p title={list.title}>{list.title}</p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenedPanel({
                  state: 4,
                  id: list.id,
                  name: list.title,
                  color: list.color,
                });
              }}
              className="edit"
            >
              <Icon name="edit" />
            </div>
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
      {openedPanel?.state === 3 && (
        <CreateListModal
          onClose={() => setOpenedPanel(null)}
          onCreate={(name, color) => {
            setOpenedPanel(null);
            CreateList(name, color);
          }}
        />
      )}
      {openedPanel?.state === 4 && (
        <CreateListModal
          onClose={() => {
            setOpenedPanel(null);
          }}
          onCreate={(name, color) => {
            EditList(openedPanel.id, name, color);
            getLists();
            setOpenedPanel(null);
          }}
          onDelete={() => {
            deleteList(openedPanel.id);
            getLists();
            setOpenedPanel(null);
          }}
          nameP={openedPanel.name}
          colorP={openedPanel.color}
        />
      )}
      {openedPanel?.state === 1 && (
        <CreateTaskModal
          onClose={() => setOpenedPanel(null)}
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
            setOpenedPanel(null);
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
