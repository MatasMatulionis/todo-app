import { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import Trash from "../../assets/icons/trash-bin.svg";

import "./styles.scss";

const Menu = () => {
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    window.electronAPI.getLists().then(setLists);
  }, []);
  //JSON.stringify(list)

  // const handleAddList = async () => {
  //   // call Electron API to add list
  //   await window.electronAPI.addList("New task", "#27a337");
  // };

  return (
    <aside>
      {/* <p>Testas: {JSON.stringify(lists)}</p> */}
      <section className="single-row-spaced-out">
        <h1>Menu</h1>
        {/* <button className="">{`fix me`}</button> */}
      </section>
      <section className="task">
        <h2>TASKS</h2>
        <button>
          <p>Today</p>
          <div className="icon">
            <span>10</span>
          </div>
        </button>
        <button>
          <p>Upcoming</p>
        </button>
        <button>Completed</button>
        <button>
          <p>Missed</p>
          <div className="icon">
            <span className="missed">!</span>
            <span>10</span>
          </div>
        </button>
      </section>
      <section className="list">
        <h2>LISTS</h2>
        {lists.map((list, index) => (
          <button key={index}>
            <div className="color" style={{ backgroundColor: list.color }} />
            <p>{list.title}</p>
            <button className="options margin-left">
              <Icon name={"edit"} />
            </button>
            <button className="options">
              <Icon name={"trash"} />
            </button>
          </button>
        ))}
      </section>
    </aside>
  );
};

export default Menu;
