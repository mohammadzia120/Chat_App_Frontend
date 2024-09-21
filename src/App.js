import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import Chats from "./components/chats";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" className="" element={<HomePage />} exact />
        <Route path="/chats" className="" element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
