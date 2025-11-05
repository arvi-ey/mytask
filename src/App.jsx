import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./components/Home"
import Login from "./components/Login"
import ProtectedRoute from "./route/ProtectedRoute"
import { DashBoard } from "./components/DashBoard"
import TaskForm from "./components/TaskForm"
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute />}  >
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/addtask" element={<TaskForm />} />
          <Route path="/updateTask/:id" element={<TaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
