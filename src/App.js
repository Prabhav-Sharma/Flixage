import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Router from "./router/Router";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Router />
      </main>
    </div>
  );
}

export default App;
