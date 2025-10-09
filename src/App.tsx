import "./App.css";
import "./pages/Pages.css";
import "./ResizePanels.css";
import NavBar from "./components/navbar";
import Sorting from "./pages/Sorting";
import Pathfinding from "./pages/Pathfinding";
import { Navigate, Route, Routes } from "react-router-dom";
import { SortingContextProvider } from "./contexts/sortingContext";
import { PathfindingContextProvider } from "./contexts/pathfindingContext";

function App() {
  const SortingPage = () => {
    return (
      <SortingContextProvider>
        <Sorting />
      </SortingContextProvider>
    );
  };

  const PathfindingPage = () => {
    return (
      <PathfindingContextProvider>
        <Pathfinding />
      </PathfindingContextProvider>
    );
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to={"/sorting"} />} />
        <Route key='sorting' path='/sorting' element={<SortingPage />} />
        <Route
          key='pathfinding'
          path='/pathfinding'
          element={<PathfindingPage />}
        />
      </Routes>
    </div>
  );
}
export default App;
