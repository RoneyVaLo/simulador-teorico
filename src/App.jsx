import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Summary from "./pages/Summary";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="test" element={<Test />} />
        <Route path="summary" element={<Summary />} />
      </Routes>
    </main>
  );
};

export default App;
