import "./NavbarLoginSignup.css";

function NavbarLoginSignup(props) {
	const { setShowLogin, setShowSignUp } = props;
	const handleClickLogin = () => {
		setShowLogin(true);
	};
	const handleClickSignUp = () => {
		setShowSignUp(true);
	};
	return (
		<div className="NavbarLoginSignup">
			<div className="Login" onClick={() => handleClickLogin()}>
				Login
			</div>
			<div className="SignUp" onClick={() => handleClickSignUp()}>
				SingUp
			</div>
		</div>
	);
}

export default NavbarLoginSignup;
