import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";

import MainPage from "./Pages/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mainpage" element={<MainPage />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
