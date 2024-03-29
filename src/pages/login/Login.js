import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { newToken, newUserId } from "../../App";
import { apiBaseUrl } from "../../api/api";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setToken } = useContext(newToken);

	const { setUserId } = useContext(newUserId);
	const navigate = useNavigate();
	const [success, setSuccess] = useState("Mit Email anmelden");

	const loginFetch = e => {
		e.preventDefault();
		const user = {
			email,
			password,
		};
		axios
			.post(apiBaseUrl + "/api/users/login", {
				email: user.email,
				password: user.password,
			})
			.then(res => {
				if (res.data.token) {
					setToken(res.data.token);
					setUserId(res.data.userObjId);
					navigate("/");
				} else {
					setSuccess("Email oder Passwort falsch!!");
				}
			});
	};

	return (
		<section className='login-Sec'>
			<div>
				<h2>Registriere Dich & Nimm Teil</h2>
				<article>
					<h2>{success}</h2>
					<form>
						<input
							onChange={e => setEmail(e.target.value)}
							value={email}
							type='email'
							name='email'
							placeholder='Email'
						/>
						<input
							onChange={e => setPassword(e.target.value)}
							value={password}
							type='password'
							name='password'
							placeholder='Passwort'
						/>
						<input
							onClick={loginFetch}
							className='btn-primary'
							type='submit'
							value='Login'
						/>
					</form>
				</article>
			</div>
		</section>
	);
};

export default Login;
