import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
	auth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultformFields = {
	email: "",
	password: "",
};
const SignInForm = () => {
	const [formFields, setformFields] = useState(defaultformFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setformFields(defaultformFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("no user associated with this email");
					break;
				default:
					console(error);
			}
			if (error.code === "auth/wrong-password") {
				alert("Incorrect Password for Email");
			}
			console.log(error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setformFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>I already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign in</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Sign in with Google
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
