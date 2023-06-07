import NavbarLoginSignup from "../Login/NavbarLoginSignup";
import { useSelector } from "react-redux";

function MagicNavbar(props) {
	const { setShowLogin, setShowSignUp } = props;
	const user = useSelector((s) => s.user);

	return (
		<>
			{!user && (
				<NavbarLoginSignup
					setShowLogin={setShowLogin}
					setShowSignUp={setShowSignUp}
				/>
			)}
		</>
	);
}
export default MagicNavbar;
