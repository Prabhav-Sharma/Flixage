import "./App.css";
import { Navigation } from "./components";
import Router from "./router/Router";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ToastContainer theme="dark" autoClose={2000} />
      <main>
        <Router />
      </main>
    </div>
  );
}

export default App;
