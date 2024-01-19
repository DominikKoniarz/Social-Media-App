import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RootPage from "./Pages/RootPage/RootPage";
import ProfilePage from "Pages/ProfilePage/ProfilePage";
import ProtectedRoutesLayout from "@components/ProtectedRoutesLayout";
import { AuthContextProvider } from "context/AuthContext";
import RootLayout from "@components/RootLayout";
import ProfileEdit from "Pages/ProfilePage/ProfileEdit/ProfileEdit";
import NotificationPage from "Pages/NotificationPage/NotificationPage";
import MessagesPage from "Pages/Messages/MessagesPage";
import NotFound from "Pages/404/NotFound";
import FoundProfilePage from "Pages/FoundProfilePage/FoundProfilePage";
import { Toaster } from "react-hot-toast";
import Chat from "Pages/Messages/Chat";
import NewChat from "Pages/Messages/NewChat";
import PickConversation from "Pages/Messages/PickConversation";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<>
					<Toaster position="bottom-right" reverseOrder={false} />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<RootLayout />}>
								<Route index path="/login" element={<LoginPage />} />
								<Route path="/register" element={<RegisterPage />} />

								<Route path="/" element={<ProtectedRoutesLayout />}>
									<Route path="/" element={<RootPage />} />
									<Route path="/profile" element={<ProfilePage />} />
									<Route path="/profile/:id" element={<FoundProfilePage />} />
									<Route path="/profileEdit" element={<ProfileEdit />} />
									<Route path="/notifications" element={<NotificationPage />} />
									<Route path="/messages" element={<MessagesPage />}>
										<Route index element={<PickConversation />} />
										<Route path=":conversationId" element={<Chat />} />
										<Route path="new/:userId" element={<NewChat />} />
									</Route>
								</Route>

								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</>
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;
