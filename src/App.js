import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Question } from "./pages";
import Temp from "./pages/Temp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/question/:id" exact element={<Question />} />
          <Route path="/temp" exact element={<Temp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
