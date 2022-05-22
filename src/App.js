import "./App.css";
import { Navigation } from "./components";
import Router from "./router/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ToastContainer theme="dark" autoClose={1000} />
      <main>
        <Router />
      </main>
    </div>
  );
}

export default App;
