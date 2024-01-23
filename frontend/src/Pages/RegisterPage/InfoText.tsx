import { Link } from "react-router-dom";

const InfoText = () => {
	return (
		<p className="text-xs font-light leading-normal capitalize text-neutral-500">
			By signing up you agree to our
			<Link to="/terms" className="text-teal-500">
				{" "}
				Terms of Service{" "}
			</Link>
			and
			<Link to="/terms" className="text-teal-500">
				{" "}
				Privacy policy
			</Link>{" "}
			and confirm that you are at least 18 years old
		</p>
	);
};
export default InfoText;
