import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Todolist from "./components/Todolist";
import Register from "./Register";
import Login from "./Login";
import Portal from "./portal/Portal";
import Topbar from "./portal/Topbar";
import Viewtodo from "./components/Viewtodo";
import Edittodo from "./components/Edittodo";
import Profile from "./components/Profile";
import Updateprofile from "./components/Updateprofile";
import Forget from "./components/Forget";
import Verification from "./components/Verification";
import ChangePassword from "./components/ChangePassword";



function App() {



  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portal" element={<Portal />}>
              <Route path="topbar" element={<Topbar />} />
            <Route path="todolist" element={<Todolist />} />
            <Route path="viewtodo/:id" element={<Viewtodo />} />
            <Route path="edittodo/:id" element={<Edittodo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="updateprofile/:id" element={<Updateprofile />} />
            </Route> 
            <Route path="/forget" element={<Forget/>} />
            <Route path="/verification/:id" element={<Verification />} />
            <Route path="/ChangePassword/:id" element={<ChangePassword/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
