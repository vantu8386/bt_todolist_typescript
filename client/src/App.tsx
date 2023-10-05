import { Routes, Route } from "react-router-dom";
import TodoPages from "./pages/TodoPages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/todo" element={<TodoPages />} />
      </Routes>
    </>
  );
}

export default App;
