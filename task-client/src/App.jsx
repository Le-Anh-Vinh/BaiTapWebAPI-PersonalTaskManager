import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
        <Routes>
          <Route path="*" element={<TaskManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;