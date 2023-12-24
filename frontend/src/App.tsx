import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RootPage from "./Pages/RootPage/RootPage";
import ProfilePage from "Pages/ProfilePage/ProfilePage";
import ProtectedRoutesLayout from "@components/ProtectedRoutesLayout";
import { AuthContextProvider } from "context/AuthContext";
import RootLayout from "@components/RootLayout";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<RootLayout />}>
							<Route index path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />

							<Route path="/" element={<ProtectedRoutesLayout />}>
								<Route path="/" element={<RootPage />} />
								<Route path="/profile" element={<ProfilePage />} />
							</Route>

							<Route path="*" element={<div>Not Found</div>} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;
