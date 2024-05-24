import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blogs" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
