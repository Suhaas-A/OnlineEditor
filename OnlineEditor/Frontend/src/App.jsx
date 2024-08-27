import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateListFiles from "./components/createListFiles";
import ViewUpdateDeleteFile from "./components/viewUpdateDeleteFile";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={ <Home/> }></Route>
        <Route path="/" element={ <Login/> }></Route>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/register" element={ <Register /> }></Route>
        <Route path="/create-list-files" element={ <CreateListFiles /> }></Route>
        <Route path="/view-update-delete-file/:id" element={ <ViewUpdateDeleteFile /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
