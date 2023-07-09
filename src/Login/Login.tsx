import React, { Fragment, useState } from "react";

import { useDispatch } from "react-redux";
import { userLogin } from "../store";
import "./Login.css";

interface NavbarLoginSignupProps {
	setShowLogin: (show: boolean) => void;
}

function Login(props: NavbarLoginSignupProps): JSX.Element {
	const { setShowLogin } = props;
	const [showAlert, setShowAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("");

	const handleCloseModal = () => {
		setShowLogin(false);
	};
	const handleLogin = async (e: any) => {
		// Call sethShow from parent(setShowLogin) function and set to false for close the modal

		e.preventDefault();
		setStatus("loading");

		const res = await fetch(
			"http://localhost:" + process.env.REACT_APP_PORT + "/users/login/",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					password,
				}),
			}
		)
			.then((res) => {
				if (!res.ok) {
					return res.text().then((text) => {
						setShowAlert(true);
						setErrorMessage(text);
						//throw new Error(text);
					});
				} else {
					res.json().then((data) => {
						setShowLogin(false);
						dispatch(userLogin(data));
						localStorage.setItem("session", data.data.token);
					});
				}
			})
			.catch((err) => {
				console.log("caught it!", err);
			});
	};

	return (
		<Fragment>
			{showAlert && <p>{errorMessage}</p>}
			<form className="LoginForm" onSubmit={handleLogin}>
				Email address {process.env.TECHNOLOGY}{" "}
				<input
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name="email"
				/>
				Password
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
				/>
				{status === "error" && (
					<p className="error">Usuario o contraseña incorrectos.</p>
				)}
				<div onClick={handleLogin}>Entrar</div>
				<div onClick={handleCloseModal}>Cerrar</div>
			</form>
		</Fragment>
	);
}
export default Login;
