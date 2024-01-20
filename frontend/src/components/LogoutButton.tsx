import axios from "axios";
import { LOGOUT_URL } from "constraints";
import useAuthContext from "hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";
export default function LogoutButton() {
	const { setAccessToken } = useAuthContext();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.get(LOGOUT_URL, { withCredentials: true });
		} catch (err) {
			console.log(err);
		} finally {
			setAccessToken(null);
			navigate("/login");
		}
	};

	return (
		<button
			type="button"
			className=" w-full h-[50px] bg-color1 flex justify-center items-center mt-auto uppercase text-lg font-semibold text-white"
			onClick={handleLogout}
		>
			<p className="hidden md:block">logout</p>
			<p className="items-center justify-center block text-2xl md:hidden">
				<FaRightFromBracket />
			</p>
		</button>
	);
}
