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
  function CreateTask(
    title: string,
    description: string,
    priority: number | null,
    status: number | null,
    listId: number | null,
  ) {
    window.electronAPI.addItem(title, description, priority, status, listId);
    // getTasks();
  }

  return (
    <aside>
      <div className="single-row-spaced-out">
        <h1>Menu</h1>
        <button className="icon-button">
          <Icon name="arrowLwL" />
        </button>
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
          <p>Today</p>
          <div className="icons">
            <span>10</span>
          </div>
        </button>
        <button>
          <p>Upcoming</p>
        </button>
        <button>
          <p>Completed</p>
        </button>
        <button>
          <p>Missed</p>
          <div className="icons">
            <span className="missed">!</span>
            <span>10</span>
          </div>
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
          <div className="item" key={index}>
            <div className="color" style={{ backgroundColor: list.color }} />
            <p>{list.title}</p>
            <button className="icon-button option margin-left">
              <Icon name="edit" />
            </button>
            <button
              onClick={() => deleteList(list.id)}
              className="icon-button option"
            >
              <Icon name="trash" />
            </button>
          </div>
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
          onCreate={(title, description, priority, status, listId) => {
            setOpenedCreateTaskModal(false);
            CreateTask(title, description, priority, status, listId);
          }}
          lists={lists}
        />
      )}
    </aside>
  );
};

export default Menu;
