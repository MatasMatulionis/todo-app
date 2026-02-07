import { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import CreateListModal from "../Templates/CreateList";

import "./styles.scss";

const Menu = () => {
  const [openedCreateModal, setOpenedCreateModal] = useState(false);
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    getLists();
  }, []);

  //JSON.stringify(list)

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
          <button className="icon-button small">
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
            onClick={() => setOpenedCreateModal(true)}
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
      {openedCreateModal && (
        <CreateListModal
          onClose={() => setOpenedCreateModal(false)}
          onCreate={(name, color) => {
            setOpenedCreateModal(false);
            CreateList(name, color);
          }}
        />
      )}
    </aside>
  );
};

export default Menu;
