import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.api.ping().then(console.log);
  }, []);

  return <div>Electron + React</div>;
}

export default App;
