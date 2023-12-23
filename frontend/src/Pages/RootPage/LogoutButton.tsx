import axios from "axios";
import { LOGOUT_URL } from "constraints";
import useAccessToken from "hooks/useAccessToken";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
	const { deleteAccessToken } = useAccessToken();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.get(LOGOUT_URL, { withCredentials: true });
		} catch (err) {
			console.log(err);
		} finally {
			deleteAccessToken();
			navigate("/login");
		}
	};

	return (
		<button
			type="button"
			className="w-[246px] h-[50px] bg-color1 flex justify-center items-center mt-auto uppercase text-lg font-semibold text-white"
			onClick={handleLogout}
		>
			logout
		</button>
	);
}
