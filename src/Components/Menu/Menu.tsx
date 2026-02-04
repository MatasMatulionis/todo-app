import "./styles.scss";

const Menu = () => {
  return (
    <aside>
      <section className="single-row-spaced-out">
        <h1>Menu</h1>
        {/* <button className="">{`fix me`}</button> */}
      </section>
      <section className="list">
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
        <button>
          <div className="color" style={{ backgroundColor: "red" }} />
          <p>Work</p>
        </button>
        <button>
          <div className="color" style={{ backgroundColor: "green" }} />
          <p>Gaming</p>
        </button>
        <button>
          <div className="color" style={{ backgroundColor: "blue" }} />
          <p>Studying</p>
        </button>
      </section>
    </aside>
  );
};

export default Menu;
