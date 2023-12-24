import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RootPage from "./Pages/RootPage/RootPage";
import ProfilePage from "Pages/ProfilePage/ProfilePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Zabiezpieczyć to tak samo jak mainpage przed bezpośrednim wejściem */}
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
